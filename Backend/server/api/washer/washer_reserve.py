from datetime import timedelta

from fastapi import APIRouter, HTTPException
from mysql.connector import Error
from pydantic import BaseModel

from server.db.get_connection import get_connection

router = APIRouter()


# ------------------ 1-3. 세탁기 예약 ------------------
class WasherUser(BaseModel):
    washer_id: int  # 세탁기 번호
    user_id: str  # 유저 이름

    class Config:
        json_schema_extra = {"example": {"washer_id": 1, "user_id": "sebin"}}


@router.post("/reserve", tags=["washer"], summary="세탁기 예약")
def reserve(data: WasherUser):
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        # 세탁기 조회
        cur.execute("SELECT end_time from washers WHERE id = %s", (data.washer_id,))
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=400, detail="해당하는 세탁기가 없습니다.")
        if not row["end_time"]:
            raise HTTPException(
                status_code=400, detail="세탁기가 즉시 사용 가능합니다."
            )


        # 1. 예약 가능 여부 확인
        cur.execute("SELECT status FROM washers WHERE id = %s", (machine_id,))
        status = cur.fetchone()

        if not status or status[0] != 'available':
            raise HTTPException(status_code=400, detail="해당 세탁기는 사용 중입니다.")

        # 2. 상태를 in_use로 업데이트
        update_query = """
            UPDATE washers 
            SET status = 'in_use', user_id = %s 
            WHERE id = %s
        """
        cur.execute(update_query, (user_id, machine_id))
        conn.commit()

        # 3. 상태 조회로 확인
        cur.execute("SELECT * FROM washers WHERE id = %s", (machine_id,))
        updated_status = cur.fetchone()

        return {"message": "예약 완료", "status": updated_status}

        # 세탁기 여러 대 예약 방지
        cur.execute("SELECT * from reservations where user_id = %s", (data.user_id,))
        res = cur.fetchall()
        if res:
            raise HTTPException(
                status_code=400, detail="이미 예약 중인 세탁기가 있습니다."
            )

        # 예약 시작
        # 세탁기 사용 종료 시간 가져오기
        cur.execute("SELECT end_time FROM washers WHERE id = %s", (data.washer_id,))
        row = cur.fetchone()
        end_time = row["end_time"]

        # 현재 예약 개수 확인
        cur.execute(
            "SELECT * FROM reservations WHERE washer_id = %s ORDER BY reserved_at ASC",
            (data.washer_id,),
        )
        reservations = cur.fetchall()

        if len(reservations) >= 2:
            raise HTTPException(
                status_code=400, detail="세탁기 당 최대 예약 수는 2회입니다."
            )

        if len(reservations) == 0:
            # 첫 번째 예약
            reserved_at = end_time + timedelta(minutes=2)  # 앞 사용자 종료 후 2분 대기
            expire_at = reserved_at + timedelta(minutes=10)  # 10분간 예약이 유효

        elif len(reservations) == 1:
            # 두 번째 예약
            reserved_at = end_time + timedelta(
                minutes=60
            )  # 첫 번째 예약까지 고려하여 60분 후로 예약 (가동 시간 45분, 예약 유효 시간 10분)
            expire_at = reserved_at + timedelta(minutes=10)  # 10분간 예약이 유효

        # 예약 등록
        cur.execute(
            """
            INSERT INTO reservations (washer_id, user_id, reserved_at, expire_at)
            VALUES (%s, %s, %s, %s)
            """,
            (data.washer_id, data.user_id, reserved_at, expire_at),
        )
        conn.commit()

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cur.close()
        conn.close()

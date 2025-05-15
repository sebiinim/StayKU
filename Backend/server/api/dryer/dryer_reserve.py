from datetime import timedelta

from fastapi import APIRouter, HTTPException
from mysql.connector import Error
from pydantic import BaseModel

from server.db.get_connection import get_connection

router = APIRouter()


# ------------------ 1-3. 세탁기 예약 ------------------
class DryerUser(BaseModel):
    dryer_id: int  # 세탁기 번호
    user_id: str  # 유저 이름

    class Config:
        json_schema_extra = {"example": {"dryer_id": 1, "user_id": "sebin"}}


@router.post("/reserve", tags=["dryer"], summary="건조기 예약")
def reserve(data: DryerUser):
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        # 세탁기 조회
        cur.execute("SELECT end_time from dryers WHERE id = %s", (data.dryer_id,))
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=400, detail="해당하는 건조기가 없습니다.")
        if not row["end_time"]:
            raise HTTPException(
                status_code=400, detail="건조기가 즉시 사용 가능합니다."
            )

        # 세탁기 여러 대 예약 방지
        cur.execute("SELECT * from d_reservations where user_id = %s", (data.user_id,))
        res = cur.fetchall()
        if res:
            raise HTTPException(
                status_code=400, detail="이미 예약 중인 건조기가 있습니다."
            )

        # 예약 시작
        # 세탁기 사용 종료 시간 가져오기
        cur.execute("SELECT end_time FROM dryers WHERE id = %s", (data.dryer_id,))
        row = cur.fetchone()
        end_time = row["end_time"]

        # 현재 예약 개수 확인
        cur.execute(
            "SELECT * FROM d_reservations WHERE dryer_id = %s ORDER BY reserved_at ASC",
            (data.dryer_id,),
        )
        d_reservations = cur.fetchall()

        if len(d_reservations) >= 2:
            raise HTTPException(
                status_code=400, detail="세탁기 당 최대 예약 수는 2회입니다."
            )

        if len(d_reservations) == 0:
            # 첫 번째 예약
            reserved_at = end_time + timedelta(minutes=2)  # 앞 사용자 종료 후 2분 대기
            expire_at = reserved_at + timedelta(minutes=10)  # 10분간 예약이 유효

        elif len(d_reservations) == 1:
            # 두 번째 예약
            reserved_at = end_time + timedelta(
                minutes=60
            )  # 첫 번째 예약까지 고려하여 60분 후로 예약 (가동 시간 45분, 예약 유효 시간 10분)
            expire_at = reserved_at + timedelta(minutes=10)  # 10분간 예약이 유효

        # 예약 등록
        cur.execute(
            """
            INSERT INTO d_reservations (dryer_id, user_id, reserved_at, expire_at)
            VALUES (%s, %s, %s, %s)
            """,
            (data.dryer_id, data.user_id, reserved_at, expire_at),
        )
        conn.commit()

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cur.close()
        conn.close()

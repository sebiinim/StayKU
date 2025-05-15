from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException
from mysql.connector import Error
from pydantic import BaseModel

from server.db.get_connection import get_connection

router = APIRouter()


# ------------------ 1-5. 세탁기 사용 시작 ------------------
class DryerUser(BaseModel):
    dryer_id: int = 1  # 세탁기 번호
    user_id: str = "sebin"  # 유저 이름


@router.post("/start", tags=["dryer"], summary="건조기 사용 시작 시 등록")
def dryer_start(data: DryerUser):
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        cur.execute("SELECT * from dryers WHERE id=%s", (data.dryer_id,))
        res = cur.fetchone()
        if res["status"] == "in_use":
            raise HTTPException(status_code=400, detail="사용 중인 건조기입니다.")

        cur.execute(
            "UPDATE dryers SET status = %s, end_time = %s, user_id = %s WHERE id = %s",
            (
                "in_use",
                datetime.now() + timedelta(minutes=45),
                data.user_id,
                data.dryer_id,
            ),
        )
        conn.commit()

        return DryerUser(dryer_id=data.dryer_id, user_id=data.user_id)

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

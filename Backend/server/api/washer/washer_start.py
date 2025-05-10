from datetime import datetime, timedelta
import os

from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from server.db.get_connection import get_connection
from mysql.connector import Error

router = APIRouter()


# ------------------ 1-5. 세탁기 사용 시작 ------------------
class WasherUser(BaseModel):
    washer_id: int  # 세탁기 번호
    user_id: str  # 유저 이름


@router.post("/start/{washer_id}", tags=["washer"], summary="세탁기 사용 시작 시 등록")
def washer_start(data: WasherUser):
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        cur.execute("SELECT * from washers WHERE id=%s", (data.washer_id,))
        res = cur.fetchone()
        if res["status"] == "in_use":
            raise HTTPException(status_code=400, detail="사용 중인 세탁기입니다.")

        cur.execute(
            "UPDATE washers SET status = %s, end_time = %s user_id = %s WHERE id = %s",
            (
                "in_use",
                datetime.now() + timedelta(minutes=45),
                data.user_id,
                data.washer_id,
            ),
        )
        conn.commit()

        return {"user_id": data.user_id, "washer_id": data.washer_id}

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

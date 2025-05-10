from datetime import datetime, timedelta
import os

from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from server.db.get_connection import get_connection
from mysql.connector import Error

router = APIRouter()


# ------------------ 1-5. 세탁기 사용 시작 ------------------
@router.get("/start/{washer_id}", tags=["washer"], summary="세탁기 사용 시작 시 등록")
def washer_start(washer_id: int):
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        cur.execute(
            "UPDATE washers SET status = 'in_use', end_time = NOW() + INTERVAL 45 MINUTE WHERE id = %s",
            (washer_id,),
        )
        conn.commit()

        return washer_id

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

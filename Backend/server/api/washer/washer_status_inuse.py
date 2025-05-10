import os

from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from server.db.get_connection import get_connection
from mysql.connector import Error

router = APIRouter()


# ------------------ 1-1. 사용 중인 세탁기 현황 보기 ------------------
@router.get("/status/in_use", tags=["washer"], summary="사용 중인 세탁기 현황 보기")
def washer_status_inuse():
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        cur.execute("SELECT * FROM washers WHERE status = 'in_use'")
        data = cur.fetchall()

        if data:
            return data
        else:
            raise HTTPException(
                status_code=500, detail=f"사용 중인 세탁기 현황 조회 실패, data={data}"
            )

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

import os

from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from server.db.get_connection import get_connection
from mysql.connector import Error

router = APIRouter()


# ------------------ 1. 세탁기 전체 현황 보기 ------------------
@router.get("/status", tags=["washer"], summary="세탁기 현황 보기")
def washer_status():
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        cur.execute("SELECT * FROM washers")
        data = cur.fetchall()

        if data:
            return data
        else:
            raise HTTPException(
                status_code=500, detail=f"세탁기 현황 조회 실패, data={data}"
            )

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

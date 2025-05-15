from fastapi import APIRouter, HTTPException
from mysql.connector import Error

from server.db.get_connection import get_connection

router = APIRouter()


# ------------------ 1-1. 사용 가능 세탁기 현황 보기 ------------------
@router.get("/status_available", tags=["dryer"], summary="사용 가능 건조기 현황 보기")
def dryer_status_available():
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        cur.execute("SELECT * FROM dryers WHERE status = 'available'")
        data = cur.fetchall()

        if data:
            return data
        else:
            raise HTTPException(
                status_code=500, detail=f"사용 가능 건조기 현황 조회 실패, data={data}"
            )

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

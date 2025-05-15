from datetime import datetime

from fastapi import APIRouter, HTTPException, Path
from mysql.connector import Error

from server.db.get_connection import get_connection

router = APIRouter()


# ------------------ 1. 세탁기 한 개 현황 보기 ------------------
@router.get("/status/{washer_id}", tags=["washer"], summary="세탁기 한 개 현황 보기")
def washer_status(washer_id: int = Path(..., example=1)):
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        # 세탁이 끝난 세탁기를 available로 전환
        cur.execute(
            "UPDATE washers SET status = %s, end_time = NULL WHERE end_time < %s",
            (
                "available",
                datetime.now(),
            ),
        )
        conn.commit()

        cur.execute("SELECT * FROM washers WHERE id = %s", (washer_id,))
        data = cur.fetchone()

        if data:
            return data
        else:
            raise HTTPException(
                status_code=500, detail=f"세탁기 한 개 현황 조회 실패, data={data}"
            )

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

from datetime import datetime, timedelta
import os

from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from server.db.get_connection import get_connection
from mysql.connector import Error

router = APIRouter()


# ------------------ 1-3. 세탁기 예약 ------------------
class WasherReserve(BaseModel):
    washer_type: str
    user_id: str


@router.post("/reserve", tags=["washer"], summary="세탁기 예약")
def reserve(data: WasherReserve):
    try:
        now = datetime.now()
        expire = now + timedelta(minutes=10)

        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            "INSERT INTO reservations (washer_type, user_id, reserved_at, expire_at) VALUES (%s, %s, %s, %s)",
            (data.washer_type, data.user_id, now, expire),
        )
        conn.commit()

        return {"status": "reserved"}

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cur.close()
        conn.close()

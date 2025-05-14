import os

from fastapi import APIRouter, HTTPException
from mysql.connector import Error
from pydantic import BaseModel
from server.db.get_connection import get_connection

router = APIRouter()


class RegisterRequest(BaseModel):
    user_id: str
    password: str


# -----------------------로그인-----------
@router.post(
    "/login",
    tags=["Auth"],
    summary="로그인",
)
def login(data: RegisterRequest):
    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        cur.execute(
            "SELECT * FROM users WHERE user_id = %s AND password = %s",
            (data.user_id, data.password),
        )
        existing = cur.fetchone()

        cur.close()
        conn.close()

        if existing:
            return {"로그인 성공": data.user_id}
        else:
            raise HTTPException(status_code=401, detail="일치하는 유저 없음")

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

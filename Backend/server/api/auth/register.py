# ------------------ 회원가입 API -----------------
# ------------------ 요청 모델 ------------------
import os

from fastapi import HTTPException, APIRouter
from pydantic import BaseModel
from server.db.get_connection import get_connection
from mysql.connector import Error

router = APIRouter()


class RegisterRequest(BaseModel):
    user_id: str
    password: str


@router.post(
    "/register",
    tags=["Auth"],
    summary="회원 가입",
)
def register(data: RegisterRequest):
    print(os.getenv("MYSQL_HOST"))
    conn = None
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        cur.execute("SELECT * FROM users WHERE user_id = %s", (data.user_id,))
        existing = cur.fetchone()

        if existing:
            raise HTTPException(status_code=400, detail="이미 존재하는 아이디입니다.")
        cur.execute(
            "INSERT INTO users (user_id, password) VALUES (%s, %s)",
            (data.user_id, data.password),
        )

        conn.commit()

        cur.close()
        conn.close()
        return {"status": "success"}

    except Error as e:
        if conn:
            conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))

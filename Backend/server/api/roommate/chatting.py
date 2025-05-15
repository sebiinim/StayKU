
from fastapi import APIRouter, HTTPException, Path
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from server.db.get_connection import \
    get_connection  # get_connection 함수 import 필요

router = APIRouter()


# Pydantic 모델 정의
class ChatMessage(BaseModel):
    from_user: str
    to_user: str
    message: str

    class Config:
        json_schema_extra = {
            "example": {
                "from_user": "sebin",
                "to_user": "ghkd",
                "message": "hihi",
            }
        }


# ------------------ 1. 룸메이트 채팅 저장 (POST /chat) ------------------
@router.post("/chat", tags=["roommate"], summary="룸메이트 채팅 저장(보내기)")
def post_chat(data: ChatMessage):
    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO roommate_chats (from_user, to_user, message)
            VALUES (%s, %s, %s)
            """,
            (data.from_user, data.to_user, data.message),
        )
        conn.commit()
        cur.close()
        conn.close()
        return JSONResponse(
            status_code=200,
            content={
                "status": "message_saved",
                "data": ChatMessage(
                    from_user=data.from_user, to_user=data.to_user, message=data.message
                ).model_dump(),
            },
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ------------------ 2. 룸메이트 채팅 내역 조회 (GET /chat/{from_user}/{to_user}) ------------------
@router.get(
    "/chat/{user_1}/{user_2}",
    tags=["roommate"],
    summary="룸메이트 채팅 내역 조회(양방향)",
)
def get_chat(
    user_1: str = Path(..., example="sebin"), user_2: str = Path(..., example="ghkd")
):
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)
        query = """
            SELECT * FROM roommate_chats
            WHERE (from_user = %s AND to_user = %s)
               OR (from_user = %s AND to_user = %s)
            ORDER BY sent_at ASC
        """
        cur.execute(query, (user_1, user_2, user_2, user_1))
        messages = cur.fetchall()
        cur.close()
        conn.close()
        return messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ------------------ 3. 나와 채팅했던 상대 내역 불러오기 (GET /chat/partners/{user_id}) ------------------
@router.get(
    "/chat-partners/{user_id}",
    tags=["roommate"],
    summary="나와 채팅했던 상대 내역 불러오기",
)
def get_chat_partners(user_id: str = Path(..., example="sebin")):
    try:
        user_id = user_id.strip()
        print(f"[DEBUG] user_id: '{user_id}'")

        conn = get_connection()
        cur = conn.cursor(dictionary=True)
        query = """
            SELECT DISTINCT 
                IF(from_user = %s, to_user, from_user) AS partner
            FROM roommate_chats
            WHERE from_user = %s OR to_user = %s
        """

        cur.execute(query, (user_id, user_id, user_id))
        result = cur.fetchall()
        print("[DEBUG] result:", result)

        partners = [row["partner"] for row in result]
        cur.close()
        conn.close()
        return partners
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

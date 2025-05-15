from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from server.db.get_connection import get_connection
from mysql.connector import Error
import random

router = APIRouter()

# ------------------ 1단계: 태그 기반 룸메 후보 조회 ------------------
@router.get("/match/tag", tags=["roommate"], summary="태그 기반 룸메 추천")
async def match_users(user_id: str):
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        # 유저의 태그 가져오기
        cur.execute("SELECT tag FROM user_tags WHERE user_id = %s", (user_id,))
        user_tags = {row['tag'] for row in cur.fetchall()}

        # 동일 건물 유저 조회
        cur.execute("""
            SELECT p.user_id, p.is_morning_person, p.is_smoker, p.snore_level, p.hygiene_level, p.hall_type 
            FROM roommate_profiles p 
            WHERE p.user_id != %s
        """, (user_id,))
        candidates = []
        for row in cur.fetchall():
            cur.execute("SELECT tag FROM user_tags WHERE user_id = %s", (row['user_id'],))
            other_tags = {tag['tag'] for tag in cur.fetchall()}
            common_tags = user_tags & other_tags
            if len(common_tags) >= 5:
                candidates.append({**row, "common_tags": list(common_tags), "common_tag_count": len(common_tags)})

        random.shuffle(candidates)
        return candidates[:3]
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

# ------------------ 2단계: 태그 기반 1:1 채팅 ------------------
@router.post("/chat/tag", tags=["roommate"], summary="태그 기반 1:1 채팅 시작")
async def tag_based_chat(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    partner_id = data.get("partner_id")
    message = data.get("message")

    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO roommate_chats (from_user, to_user, message)
            VALUES (%s, %s, %s)
            """,
            (user_id, partner_id, message),
        )
        conn.commit()
        cur.close()
        conn.close()
        return {"status": "채팅 전송 성공"}
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

# ------------------ 3단계: 상대방을 룸메이트로 등록 ------------------
@router.post("/team/connect", tags=["roommate"], summary="룸메이트로 등록")
async def connect_roommate(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    partner_id = data.get("partner_id")
    hall_type = data.get("hall_type")

    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO roommate_connections (user_id, partner_id, status, hall_type)
            VALUES (%s, %s, %s, %s)
            """,
            (user_id, partner_id, "confirmed", hall_type),
        )
        conn.commit()
        return {"status": "룸메이트로 연결 완료"}
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

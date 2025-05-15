
from fastapi import APIRouter, HTTPException, Query, Request
from mysql.connector import Error

from server.db.get_connection import get_connection

router = APIRouter()


# ------------------ 1단계: 태그 기반 룸메 추천 ------------------
@router.get(
    "/match-by-tag", tags=["roommate"], summary="태그 기반 룸메 추천, 기본은 3명"
)
async def match_users(
    user_id: str = Query(..., example="sebin"),
    recommend_num: int = Query(3, example=3),
):
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        # 현재 유저 정보 조회
        cur.execute(
            """
            SELECT user_id, is_morning_person, is_smoker, snore_level, hygiene_level, hall_type
            FROM roommate_profiles
            WHERE user_id = %s
        """,
            (user_id,),
        )
        me = cur.fetchone()
        if not me:
            raise HTTPException(status_code=404, detail="사용자 정보가 없습니다.")

        # 동일 건물의 다른 유저 조회
        cur.execute(
            """
            SELECT user_id, is_morning_person, is_smoker, snore_level, hygiene_level
            FROM roommate_profiles
            WHERE hall_type = %s AND user_id != %s
        """,
            (me["hall_type"], user_id),
        )
        same_hall_users = cur.fetchall()

        # 매칭 점수 계산 (우선순위 반영)
        def match_score(other):
            score = 0
            score += 8 if other["snore_level"] == me["snore_level"] else 0
            score += 4 if other["is_smoker"] == me["is_smoker"] else 0
            score += 2 if other["is_morning_person"] == me["is_morning_person"] else 0
            score += 1 if other["hygiene_level"] == me["hygiene_level"] else 0
            return score

        matches = []
        for user in same_hall_users:
            score = match_score(user)
            # 겹치는 항목 추출
            matched_tags = []
            if user["snore_level"] == me["snore_level"]:
                matched_tags.append("snore_level")
            if user["is_smoker"] == me["is_smoker"]:
                matched_tags.append("is_smoker")
            if user["is_morning_person"] == me["is_morning_person"]:
                matched_tags.append("is_morning_person")
            if user["hygiene_level"] == me["hygiene_level"]:
                matched_tags.append("hygiene_level")

            if score > 0:
                matches.append(
                    {
                        "user_id": user["user_id"],
                        "match_score": score,
                        "match_tags": matched_tags,
                        "snore_level": user["snore_level"],
                        "is_smoker": user["is_smoker"],
                        "is_morning_person": user["is_morning_person"],
                        "hygiene_level": user["hygiene_level"],
                    }
                )

        # 점수 높은 순으로 정렬 후 상위 5명 선택
        top_matches = sorted(matches, key=lambda x: -x["match_score"])[:recommend_num]

        if not top_matches:
            raise HTTPException(
                status_code=404,
                detail="같은 건물에 태그가 겹치는 사용자가 한 명도 없습니다.",
            )

        cur.close()
        conn.close()

        return {"status": "success", "matches": top_matches}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ------------------ 2단계: 태그 기반 1:1 채팅 ------------------
@router.post(
    "/chat_by_tag",
    tags=["roommate"],
    summary="(deprecated), /chat 으로 대체 가능해서 쓰지 말자, 태그 기반 1:1 채팅 시작",
)
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
@router.post(
    "/team/connect",
    tags=["roommate"],
    summary="(deprecated), /register_team으로 대체 가능해서 쓰지 말자, 룸메이트로 등록",
)
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

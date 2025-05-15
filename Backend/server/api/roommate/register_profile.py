from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, conint
from fastapi.responses import JSONResponse

from server.db.get_connection import get_connection

# FastAPI 라우터 생성
router = APIRouter()


# ss
# Pydantic 모델 정의
class ProfileData(BaseModel):
    user_id: str
    is_morning_person: bool
    is_smoker: bool
    snore_level: conint(ge=1, le=5)
    hygiene_level: conint(ge=1, le=5)
    hall_type: str

    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "sebin",
                "is_morning_person": True,
                "is_smoker": False,
                "snore_level": 1,
                "hygiene_level": 5,
                "hall_type": "old_man",
            }
        }


# ------------------ 2-1. 룸메이트 성향 등록 ------------------
@router.post("/profile", tags=["roommate"], summary="내 프로필 등록")
def register_profile(data: ProfileData):
    try:
        # MySQL 연결 설정
        conn = get_connection()
        cur = conn.cursor()

        # 1. 프로필 저장
        cur.execute(
            """
            REPLACE INTO roommate_profiles 
            (user_id, is_morning_person, is_smoker, snore_level, hygiene_level, hall_type)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (
                data.user_id,
                data.is_morning_person,
                data.is_smoker,
                data.snore_level,
                data.hygiene_level,
                data.hall_type,
            ),
        )

        # 2. 기존 자동 태그 제거 (한 번만!)
        cur.execute(
            "DELETE FROM user_tags WHERE user_id = %s",
            (data.user_id,),
        )

        if data.is_morning_person:
            is_morning_person_tag = "#아침형"
        else:
            is_morning_person_tag = "#저녁형"

        if data.is_smoker:
            is_smoker_tag = "#흡연"
        else:
            is_smoker_tag = "#비흡연"

        if data.snore_level <= 2:
            snore_level_tag = "코골이 적음"
        if data.snore_level == 3:
            snore_level_tag = "코골이 보통"
        elif data.snore_level >= 4:
            snore_level_tag = "코골이 많음"

        if data.hygiene_level <= 2:
            hygiene_level_tag = "청소 자주 안 함"
        if data.hygiene_level == 3:
            hygiene_level_tag = "청소 적당히 함"
        if data.hygiene_level >= 4:
            hygiene_level_tag = "청소 자주 함"

        # 4. 자동 태그 DB에 저장
        cur.execute(
            "INSERT INTO user_tags (user_id, is_morning_person, is_smoker, snore_level, hygiene_level) VALUES (%s, %s, %s, %s, %s)",
            (
                data.user_id,
                is_morning_person_tag,
                is_smoker_tag,
                snore_level_tag,
                hygiene_level_tag,
            ),
        )

        # DB 커밋
        conn.commit()

        # MySQL 커넥션 닫기
        cur.close()
        conn.close()

        # 성공 메시지 반환
        return JSONResponse(
            status_code=200,
            content={
                "status": "profile_saved",
                "profile": ProfileData(
                    user_id=data.user_id,
                    is_morning_person=data.is_morning_person,
                    is_smoker=data.is_smoker,
                    snore_level=data.snore_level,
                    hygiene_level=data.hygiene_level,
                    hall_type=data.hall_type,
                ).model_dump(),
            },
        )

    except Exception as e:
        # 예외 처리
        raise HTTPException(status_code=500, detail=f"서버 오류: {str(e)}")

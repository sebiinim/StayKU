from typing import List

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from server.db.get_connection import get_connection

router = APIRouter()

# ------------------- Pydantic Models -------------------


class TeamRequest(BaseModel):
    members: List[str]
    hall_type: str

    class Config:
        json_schema_extra = {
            "example": {"members": ["sebin", "ghkd", "jun"], "hall_type": "old_man"}
        }


@router.post("/teams", tags=["roommate"], summary="룸메이트 팀 등록")
def register_team(data: TeamRequest):
    try:
        members = data.members
        hall_type = data.hall_type

        if "new" in hall_type and len(members) != 2:
            raise HTTPException(status_code=400, detail="신관은 2인만 가능합니다.")
        if "old" in hall_type and len(members) != 3:
            raise HTTPException(status_code=400, detail="구관은 3인만 가능합니다.")

        conn = get_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO roommate_teams (hall_type) VALUES (%s)", (hall_type,))
        team_id = cur.lastrowid

        for user_id in members:
            cur.execute(
                "INSERT INTO roommate_team_members (team_id, hall_type, user_id) VALUES (%s, %s, %s)",
                (team_id, hall_type, user_id),
            )

        conn.commit()
        cur.close()
        conn.close()

        return JSONResponse(content={"team_id": team_id, "status": "team_created"})

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

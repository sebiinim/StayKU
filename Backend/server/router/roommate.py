from fastapi import APIRouter

from server.api.roommate.chatting import router as chatting
from server.api.roommate.matching import router as matching
from server.api.roommate.profile import router as register_profile
from server.api.roommate.team import router as register_team

# from server.api.roommate.tags import router as tags


roommate_router = APIRouter()

roommate_router.include_router(register_profile)
roommate_router.include_router(chatting)
roommate_router.include_router(register_team)
roommate_router.include_router(matching)
# roommate_router.include_router(tags)

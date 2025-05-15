from fastapi import APIRouter

from server.api.roommate.register_profile import router as register_profile
from server.api.roommate.chatting import router as chatting
from server.api.roommate.register_team import router as register_team

roommate_router = APIRouter()

roommate_router.include_router(register_profile)
roommate_router.include_router(chatting)
roommate_router.include_router(register_team)

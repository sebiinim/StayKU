from fastapi import APIRouter

from server.api.auth.register import router as register
from server.api.auth.login import router as login

auth_router = APIRouter()

auth_router.include_router(register)
auth_router.include_router(login)

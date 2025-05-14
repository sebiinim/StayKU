from fastapi import APIRouter
from server.api.auth.login import router as login
from server.api.auth.register import router as register

auth_router = APIRouter()

auth_router.include_router(register)
auth_router.include_router(login)

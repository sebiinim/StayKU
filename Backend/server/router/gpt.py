from fastapi import APIRouter
from server.api.auth.login import router as login
from server.api.chatgpt.chatgpt import router as chat_gpt

gpt_router = APIRouter()

gpt_router.include_router(chat_gpt)

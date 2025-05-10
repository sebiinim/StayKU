from datetime import datetime, timedelta
import os

from fastapi import HTTPException, APIRouter
import openai
from pydantic import BaseModel
from server.db.get_connection import get_connection
from mysql.connector import Error

router = APIRouter()

# ------------------ OpenAI API 키 ------------------
openai.api_key = os.getenv("OPENAI_API_KEY")


# ------------------ GPT API 사용 ------
# 요청 모델
class ChatRequest(BaseModel):
    message: str


# 응답 모델 (선택적)
class ChatResponse(BaseModel):
    reply: str


@router.post("/chatgpt", response_model=ChatResponse)
def chatgpt(request: ChatRequest):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4", messages=[{"role": "user", "content": request.message}]
        )
        reply = response["choices"][0]["message"]["content"]
        return {"reply": reply}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

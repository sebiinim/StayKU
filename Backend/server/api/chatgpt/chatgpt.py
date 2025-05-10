import os
from pathlib import Path
from openai import OpenAI
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv

router = APIRouter()

# ------------------ OpenAI API 키 ------------------
# env 설정 추가
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


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
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": request.message},
            ],
            temperature=0.7,
        )
        reply = response.choices[0].message.content.strip()
        return ChatResponse(reply=reply)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

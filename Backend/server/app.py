from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
import openai
from pathlib import Path
from datetime import datetime, timedelta

from server.db.get_connection import get_connection
from server.middleware.cors_middleware import cors_middleware

app = FastAPI()

# env 설정 추가
env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

# 미들웨어 CORS 설정 추가
cors_middleware(app)

# 라우터---
from server.router.auth import auth_router

app.include_router(auth_router, prefix="/auth")

from server.router.washer import washer_router

app.include_router(washer_router, prefix="/washer")

from server.router.gpt import gpt_router

app.include_router(gpt_router, prefix="/gpt")


# ------------------ 기본 라우트 ------------------
@app.get("/")
def home():
    return "Hello from Flask!"

import os
from contextlib import asynccontextmanager
from pathlib import Path

from apscheduler.schedulers.background import BackgroundScheduler
from dotenv import load_dotenv
from fastapi import FastAPI

from server.middleware.cors_middleware import cors_middleware
from server.scheduler.tasks import washer_scheduler

# ------------------ 스케줄러 -----------------
scheduler = BackgroundScheduler()


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("[app] Starting scheduler via lifespan")
    scheduler.add_job(washer_scheduler, "interval", seconds=30)
    scheduler.start()
    yield
    print("[app] Shutting down scheduler")
    scheduler.shutdown()


app = FastAPI(lifespan=lifespan)

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

from server.router.dryer import dryer_router

app.include_router(dryer_router, prefix="/dryer")

from server.router.gpt import gpt_router

app.include_router(gpt_router, prefix="/gpt")

from server.router.roommate import roommate_router

app.include_router(roommate_router, prefix="/roommate")


# ------------------ 기본 라우트 ------------------
@app.get("/")
def home():
    return "Hello from StayKU!"

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def cors_middleware(app: FastAPI):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # 모든 도메인 허용 (보안상 필요에 따라 제한 가능)
        allow_credentials=True,
        allow_methods=["*"],  # 모든 HTTP 메서드 허용
        allow_headers=["*"],  # 모든 헤더 허용
    )

from fastapi import APIRouter
from server.api.washer.washer_reserve import router as washer_reserve
from server.api.washer.washer_start import router as washer_start
from server.api.washer.washer_status import router as washer_status
from server.api.washer.washer_status_one import router as washer_status_one
from server.api.washer.washer_status_available import router as washer_status_available
from server.api.washer.washer_status_inuse import router as washer_status_inuse


washer_router = APIRouter()

washer_router.include_router(washer_reserve)
washer_router.include_router(washer_start)
washer_router.include_router(washer_status)
washer_router.include_router(washer_status_one)
washer_router.include_router(washer_status_available)
washer_router.include_router(washer_status_inuse)

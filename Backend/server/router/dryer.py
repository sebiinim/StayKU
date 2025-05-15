from fastapi import APIRouter

from server.api.dryer.dryer_reserve import router as dryer_reserve
from server.api.dryer.dryer_start import router as dryer_start
from server.api.dryer.dryer_status import router as dryer_status
from server.api.dryer.dryer_status_available import router as dryer_status_available
from server.api.dryer.dryer_status_inuse import router as dryer_status_inuse
from server.api.dryer.dryer_status_one import router as dryer_status_one

dryer_router = APIRouter()

dryer_router.include_router(dryer_reserve)
dryer_router.include_router(dryer_start)
dryer_router.include_router(dryer_status)
dryer_router.include_router(dryer_status_one)
dryer_router.include_router(dryer_status_available)
dryer_router.include_router(dryer_status_inuse)

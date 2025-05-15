# from fastapi import APIRouter, HTTPException, Request, Path, Query
# from fastapi.responses import JSONResponse
# from pydantic import BaseModel
# from typing import List, Optional
# import random
# from server.db.get_connection import get_connection

# router = APIRouter()


# class TagSaveRequest(BaseModel):
#     user_id: str
#     tags: List[str]


# @router.post("/tags")
# def save_tags(data: TagSaveRequest):
#     try:
#         conn = get_connection()
#         cur = conn.cursor()

#         cur.execute("DELETE FROM user_tags WHERE user_id = %s", (data.user_id,))
#         for tag in data.tags:
#             cur.execute(
#                 "INSERT INTO user_tags (user_id, tag) VALUES (%s, %s)",
#                 (data.user_id, tag),
#             )

#         conn.commit()
#         cur.close()
#         conn.close()

#         return JSONResponse(content={"status": "success"})

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


# @router.get("/tags/{user_id}")
# def get_user_tags(user_id: str = Path(...)):
#     try:
#         conn = get_connection()
#         cur = conn.cursor(dictionary=True)
#         cur.execute("SELECT tag FROM user_tags WHERE user_id = %s", (user_id,))
#         result = cur.fetchall()
#         cur.close()
#         conn.close()

#         tags = [row["tag"] for row in result]
#         return tags

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

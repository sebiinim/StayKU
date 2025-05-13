import os
from datetime import datetime, timedelta
from pathlib import Path

import mysql.connector
import openai
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mysql.connector import Error
from pydantic import BaseModel
from server.db.get_connection import get_connection

router = APIRouter()


# ------------------ 2-3. 룸메이트 팀 구성 ------------------
@app.route("/team", methods=["POST"])
def create_team():
    data = request.json
    members = data["members"]
    hall_type = data["hall_type"]

    if hall_type == "신관" and len(members) != 2:
        return jsonify({"error": "신관은 2인만 가능합니다."}), 400
    if hall_type == "구관" and len(members) != 3:
        return jsonify({"error": "구관은 3인만 가능합니다."}), 400

    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO roommate_teams (hall_type) VALUES (%s)", (hall_type,))
    team_id = cur.lastrowid

    for user_id in members:
        cur.execute(
            "INSERT INTO roommate_team_members (team_id, user_id) VALUES (%s, %s)",
            (team_id, user_id),
        )

    mysql.connection.commit()
    cur.close()

    return jsonify({"team_id": team_id, "status": "team_created"})


# ------------------ 태그 저장하기 --------------
@app.route("/tags", methods=["POST"])
def save_tags():
    try:
        data = request.get_json()
        user_id = data["user_id"]
        tags = data["tags"]

        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM user_tags WHERE user_id = %s", (user_id,))
        for tag in tags:
            cursor.execute(
                "INSERT INTO user_tags (user_id, tag) VALUES (%s, %s)", (user_id, tag)
            )
        mysql.connection.commit()
        cursor.close()

        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------태그 가져오기--------------
@app.route("/tags/<user_id>", methods=["GET"])
def get_user_tags(user_id):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT tag FROM user_tags WHERE user_id = %s", (user_id,))
        result = cursor.fetchall()
        cursor.close()

        tags = [row["tag"] for row in result]
        return jsonify(tags), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ------------------태그 기반으로 매칭 추천 ---------------
@app.route("/match/<user_id>", methods=["GET"])
def match_users(user_id):
    try:
        exclude = request.args.getlist("exclude")  # /match/tae?exclude=a&exclude=b

        cur = mysql.connection.cursor()

        # 1. 현재 유저 태그 및 hall_type 조회
        cur.execute("SELECT tag FROM user_tags WHERE user_id = %s", (user_id,))
        user_tags = set(row[0] for row in cur.fetchall())

        cur.execute(
            "SELECT hall_type FROM roommate_profiles WHERE user_id = %s", (user_id,)
        )
        result = cur.fetchone()
        if not result:
            return jsonify([]), 200
        my_hall = result[0]

        # 2. 다른 유저들 조회 (같은 건물, 자기 자신 제외, exclude 제외)
        cur.execute(
            """
            SELECT u.user_id, p.is_morning_person, p.is_smoker, p.snore_level, 
                   p.hygiene_level, p.hall_type
            FROM users u
            JOIN roommate_profiles p ON u.user_id = p.user_id
            WHERE u.user_id != %s AND p.hall_type = %s
        """,
            (user_id, my_hall),
        )

        candidates = []
        for row in cur.fetchall():
            other_id = row[0]
            if other_id in exclude:
                continue

            cur.execute("SELECT tag FROM user_tags WHERE user_id = %s", (other_id,))
            other_tags = set(tag[0] for tag in cur.fetchall())

            common_tags = user_tags & other_tags
            if len(common_tags) >= 5:
                candidates.append(
                    {
                        "user_id": other_id,
                        "is_morning_person": row[1],
                        "is_smoker": row[2],
                        "snore_level": row[3],
                        "hygiene_level": row[4],
                        "hall_type": row[5],
                        "common_tag_count": len(common_tags),
                        "common_tags": list(common_tags),
                        "all_tags": list(other_tags),
                    }
                )

        cur.close()

        # 랜덤으로 3명 추출
        import random

        random.shuffle(candidates)
        return jsonify(candidates[:3]), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

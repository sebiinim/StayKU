from datetime import datetime, timedelta

from mysql.connector import Error

from server.db.get_connection import get_connection


# 시간이 된 예약을 시작하고 DB에서 삭제
def washer_scheduler():
    print("[scheduler] start")
    conn = None
    try:

        conn = get_connection()
        cur = conn.cursor(dictionary=True)

        # 세탁이 끝난 세탁기를 available로 전환
        cur.execute(
            "UPDATE washers SET status = %s, end_time = NULL, user_id = NULL WHERE end_time < %s",
            (
                "available",
                datetime.now(),
            ),
        )

        now = datetime.now()
        cur.execute("SELECT * FROM reservations WHERE reserved_at <= %s", (now,))
        reservations = cur.fetchall()

        # 시간이 된 예약 관리
        for r in reservations:
            washer_id = r["washer_id"]
            user_id = r["user_id"]
            print(f"[scheduler] activating washer {washer_id} by {user_id}")

            # 1. 세탁기 사용 상태로 전환
            cur.execute(
                "UPDATE washers SET status = %s, end_time = %s, user_id = %s WHERE id = %s",
                ("in_use", now + timedelta(minutes=45), user_id, washer_id),
            )

            # 2. 예약 삭제
            cur.execute("DELETE FROM reservations WHERE id = %s", (r["id"],))

        conn.commit()
        cur.close()
        conn.close()

        print("[scheduler] end")

    except Error as e:
        print("[scheduler] DB error:", e)
    except Exception as e:
        print("[scheduler] unknown error:", e)

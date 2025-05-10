def refresh_washer_status(conn):
    cur = conn.cursor()
    cur.execute(
        """
        UPDATE washers
        SET status = 'available', end_time = NULL
        WHERE end_time IS NOT NULL AND end_time <= NOW()
    """
    )
    conn.commit()
    cur.close()

-- 데이터베이스 생성
DROP DATABASE IF EXISTS laundry_db;
CREATE DATABASE IF NOT EXISTS laundry_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE laundry_db;

SET NAMES utf8mb4;
-- 기존 테이블 제거 (자식 → 부모 순)
DROP TABLE IF EXISTS roommate_team_members;
DROP TABLE IF EXISTS roommate_teams;
DROP TABLE IF EXISTS roommate_chats;
DROP TABLE IF EXISTS roommate_profiles;
DROP TABLE IF EXISTS roommate_connections;
DROP TABLE IF EXISTS user_tags;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS washers;
DROP TABLE IF EXISTS dryers;
DROP TABLE IF EXISTS users;

-- 1. 사용자 계정 테이블
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100),
    password VARCHAR(100) NOT NULL
);

-- 2. 세탁기 상태
CREATE TABLE IF NOT EXISTS washers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(10) NOT NULL,
    user_id VARCHAR(100),
    end_time DATETIME DEFAULT NULL,
    remaining_time INT
);

-- 2-1. 세탁기 10개 생성
INSERT washers (status, end_time, remaining_time)
VALUES
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL);



-- 3. 세탁기 예약
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    washer_id INT,
    washer_type VARCHAR(10),
    user_id VARCHAR(100),
    reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expire_at TIMESTAMP
);

-- 건조기 table
CREATE TABLE IF NOT EXISTS dryers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(10) NOT NULL,
    user_id VARCHAR(100),
    end_time DATETIME DEFAULT NULL,
    remaining_time INT
);

-- 2-1. 건조기 10개 생성
INSERT dryers (status, end_time, remaining_time)
VALUES
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL),
('available', NULL, NULL);

-- 3. 건조기 예약
CREATE TABLE IF NOT EXISTS d_reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dryer_id INT,
    dryer_type VARCHAR(10),
    user_id VARCHAR(100),
    reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expire_at TIMESTAMP
);

-- 4. 룸메이트 프로필 (외래키 연결)
CREATE TABLE IF NOT EXISTS roommate_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100),
    is_morning_person BOOLEAN,
    is_smoker BOOLEAN,
    snore_level INT,
    hygiene_level INT,
    hall_type ENUM('old_man', 'old_woman', 'new_man', 'new_woman')
    # FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 5. 채팅
CREATE TABLE IF NOT EXISTS roommate_chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_user VARCHAR(100),
    to_user VARCHAR(100),
    message TEXT,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- 6. 룸메이트 팀
CREATE TABLE IF NOT EXISTS roommate_teams (
    team_id INT AUTO_INCREMENT PRIMARY KEY,
    hall_type ENUM('old_man', 'old_woman', 'new_man', 'new_woman')
);

-- 7. 팀 구성원
CREATE TABLE IF NOT EXISTS roommate_team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT,
    hall_type ENUM('old_man', 'old_woman', 'new_man', 'new_woman'),
    user_id VARCHAR(100)
    # FOREIGN KEY(team_id) REFERENCES roommate_teams(team_id) ON DELETE CASCADE
);

-- 8. 태그
CREATE TABLE IF NOT EXISTS user_tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100),
    is_morning_person VARCHAR(30),
    is_smoker VARCHAR(30),
    snore_level VARCHAR(30),
    hygiene_level VARCHAR(30)
    # FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- 9. 룸메 등록
CREATE TABLE IF NOT EXISTS roommate_connections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    partner_id VARCHAR(100) NOT NULL,
    status ENUM('confirmed', 'pending') DEFAULT 'pending',
    hall_type ENUM('old_man', 'old_woman', 'new_man', 'new_woman') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

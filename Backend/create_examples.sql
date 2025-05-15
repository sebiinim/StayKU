USE laundry_db;

-- users
INSERT INTO users (user_id, password) VALUES
('sebin', 'pass123'),
('hyeon', 'pass123'),
('jun', 'pass123'),
('yeon', 'pass123'),
('ghkd', 'pass123'),
('bin', 'pass123');

-- washers (이미 생성되어 있으므로 건너뜀)

-- reservations
INSERT INTO reservations (washer_id, washer_type, user_id, reserved_at, expire_at) VALUES
(1, NULL, 'sebin',     DATE_ADD(NOW(), INTERVAL 12 MINUTE), DATE_ADD(NOW(), INTERVAL 57 MINUTE)),
(2, NULL, 'hyeon',     DATE_ADD(NOW(), INTERVAL 25 MINUTE), DATE_ADD(NOW(), INTERVAL 70 MINUTE)),
(3, NULL, 'jun',       DATE_ADD(NOW(), INTERVAL 7 MINUTE),  DATE_ADD(NOW(), INTERVAL 52 MINUTE)),
(4, NULL, 'yeon',      DATE_ADD(NOW(), INTERVAL 45 MINUTE), DATE_ADD(NOW(), INTERVAL 90 MINUTE)),
(5, NULL, 'ghkd',      DATE_ADD(NOW(), INTERVAL 0 MINUTE),  DATE_ADD(NOW(), INTERVAL 45 MINUTE));

-- roommate_profiles
INSERT INTO roommate_profiles (user_id, is_morning_person, is_smoker, snore_level, hygiene_level, hall_type) VALUES
('sebin', TRUE, TRUE, 1, 5, 'new_woman'),
('hyeon', FALSE, TRUE, 1, 5, 'new_woman'),
('jun', TRUE, FALSE, 3, 3, 'new_man'),
('yeon', FALSE, TRUE, 2, 5, 'new_woman'),
('ghkd', TRUE, FALSE, 5, 3, 'new_man'),
('bin', TRUE, FALSE, 4, 2, 'new_man');

INSERT INTO user_tags (user_id, is_morning_person, is_smoker, snore_level, hygiene_level) VALUES
('sebin', '아침형', '흡연', '코골이 적음', '청소 자주 함'),
('hyeon', '저녁형', '흡연', '코골이 적음', '청소 자주 함'),
('jun', '아침형', '비흡연', '코골이 보통', '청소 적당히 함'),
('yeon', '저녁형', '흡연', '코골이 적음', '청소 자주 함'),
('ghkd', '아침형', '비흡연', '코골이 많음', '청소 적당히 함'),
('bin', '아침형', '비흡연', '코골이 많음', '청소 자주 안 함');

-- roommate_chats
INSERT INTO roommate_chats (from_user, to_user, message) VALUES
('sebin', 'hyeon', '안녕!'),
('hyeon', 'sebin', '하이~'),
('jun', 'ghkd', '오늘 청소하자'),
('ghkd', 'jun', '콜!'),
('yeon', 'sebin', '너 어제 예약했어?'),
('sebin', 'yeon', '응 1번 세탁기!');

-- roommate_team_members
INSERT INTO roommate_team_members (team_id, hall_type, user_id) VALUES
(1, 'new_woman', 'ghkd'),
(1, 'new_woman', 'hyeon'),
(2, 'new_man', 'jun'),
(2, 'new_man', 'sebin'),
(3, 'old_man', 'bin1'),
(3, 'old_man', 'bin2'),
(3, 'old_man', 'bin3');

INSERT INTO roommate_teams (team_id, hall_type) VALUES
(1, 'new_woman'),
(2, 'new_man'),
(3, 'old_man');
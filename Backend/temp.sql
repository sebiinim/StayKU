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
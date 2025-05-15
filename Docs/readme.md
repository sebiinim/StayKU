# 📦 현재 예시 데이터베이스 상태 (예: 개발용)

## 👤 users (회원 계정)
| user_id | password |
|---------|----------|
| sebin   | pass123  |
| hyeon   | pass123  |
| jun     | pass123  |
| yeon    | pass123  |
| ghkd    | pass123  |
| bin     | pass123  |

- 이 아이디/비밀번호로 로그인 가능
- 새 계정 가입도 가능

---

## 🧺 reservations (세탁기 예약)
총 5명 예약, 각기 다른 세탁기 사용 중:
- 예약 시간: NOW() + 0~45분
- 만료 시간: 예약 시간 + 45분

| user_id | washer_id | 예시 예약 시간 오프셋 |
|---------|-----------|-----------------------|
| sebin   | 1         | +12분                 |
| hyeon   | 2         | +25분                 |
| jun     | 3         | +7분                  |
| yeon    | 4         | +45분                 |
| ghkd    | 5         | +0분                  |

---

## 🧍‍♀️ roommate_profiles (룸메이트 프로필)

| user_id | 아침형 | 흡연 | 코골이 | 청소 | 건물 |
|---------|--------|------|--------|------|------|
| sebin   | O      | O    | 1      | 5    | new_woman |
| hyeon   | X      | O    | 1      | 5    | new_woman |
| jun     | O      | X    | 3      | 3    | new_man   |
| yeon    | X      | O    | 2      | 5    | new_woman |
| ghkd    | O      | X    | 5      | 3    | new_man   |
| bin     | O      | X    | 4      | 2    | new_man   |

---

## 🏷️ user_tags (한글 태그 표현)

- 위 프로필을 자연어로 설명
- 예: "#아침형", "코골이 보통", "청소 자주 함"

---

## 💬 roommate_chats (채팅)

6개의 채팅 기록:
- `sebin ↔ hyeon`, `jun ↔ ghkd`, `sebin ↔ yeon`

---

## 👥 roommate_teams & team_members

- 팀 3개 존재
  - team_id 1: new_woman
  - team_id 2: new_man
  - team_id 3: old_man

| team_id | hall_type | user_ids               |
|---------|-----------|------------------------|
| 1       | new_woman | ghkd, hyeon            |
| 2       | new_man   | jun, sebin             |
| 3       | old_man   | bin1, bin2, bin3       |

---

✅ 이 데이터는 현재 개발용 DB 상태를 요약한 것입니다.

# Laundry & Roommate Management App

Flask + MySQL + OpenAI API + Android Studio 초기 프로젝트
Vercel로 프론트엔드 클라이언트, Render로 백엔드 서버 배포, TiDB로 Mysql cloud 사용.

---

## 서버 실행 방법 (Flask)

### 1. Python 3.10 이상

### 2. MySQL 설치
(MySQL Server를 설치하고, 비밀번호를 설정)

### 3. Backend/server/ 폴더로 이동
```bash
cd C:\Users\User\Desktop\project\server
```
(참고하여 자신의 폴더 구조에 맞게 이동)

### 4. 가상환경(venv) 생성 및 활성화
```bash
python -m venv .venv
```

- Windows에서 venv 활성화

\server 에서 실행
```bash
.venv\scripts\activate
```

- (.venv)가 표시되어야 가상환경이 활성화된 것이다. 

```bash
(.venv) PS C:\Users\User\Desktop\project\server>
```

> **가상환경 (venv) 활성화하지 않으면 pip install, uvicorn 서버 실행 등 작업이 잘 되지 않음!**


### 5. 필요한 패키지 설치

\Backend 에서 실행
```bash
pip install -r requirements.txt
```

### 6. MySQL에 데이터비스 및 테이블 생성

실행 위치 상관 없음
```bash
mysql -u root -p < init_db.sql
```

(MySQL 비밀번호 입력)

### 7. .env 파일 생성 및 환경 변수 설정
\Backend\server에 .env 라는 파일 만들고 아래처럼 채우기

# .env.example
시연용으로 필요하다면 알려드릴게요.
MYSQL_HOST=your-mysql-host
MYSQL_PORT=your-port
MYSQL_USER=your-username
MYSQL_PASSWORD=your-password
MYSQL_DB=laundry_db
OPENAI_API_KEY=your-api-key


### 8. Flask 서버 실행

```bash
cd \Backend
uvicorn server.app:app
```

실행 결과:

```
 * Running on http://localhost:5000 (포트 번호는 달라질 수 있음)
```

---

## 애플리케이션 실행 방법 (Android)

1. Android Studio 설치
2. `app/` 폴더를 Android Studio로 열기
3. `build.gradle` 혹은 "Sync Now" 누르기
4. Emulator 혹은 시작 시작 필요
5. Run 버튼 (\u25b6\ufe0f) 누르기

---

## 주의사항

- Android Emulator에서 localhost 접계할 때는 `10.0.2.2`를 사용
- `.env` 파일은 Git에 게시하지 않고 .gitignore에 추가
- server/ 폴더에서 venv 활성화하고 pip install, python app.py 작업 필요
- Flask 서버 가 활성화되어 있어야 app에서 가능

---

## 등록한 아이디 db에서 보는 법

- 터미널에 접속해서 아래의 명령어 순서대로 입력하기
1. mysql -u root -p
2. USE laundry_db;
3. SELECT * FROM users;
4. SELECT * FROM roommate_profiles;

## 등록한 아이디가 보낸 메시지 보는 법
1. SELECT * FROM roommate_chats WHERE from_user = 'sugi2845';
2. SELECT * FROM roommate_chats;

## 전체 사용자 태그 목록 확인:
1. 전체 사용자 태그 목록 확인
```
SELECT * FROM user_tags;
```
2. 특정 태그 가진 사용자 모두 보기
```
SELECT user_id FROM user_tags WHERE tag = '비흡연';
```
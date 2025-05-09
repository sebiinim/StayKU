## 현재 회원가입한 아이디 데이터 베이스
```
+----------+-------------+
| user_id  | password    |
+----------+-------------+
| 1        | 1           |
| 2        | 2           |
| 3        | 3           |
| 4        | 4           |
| sugi2845 | tjduswl123! |
+----------+-------------+
```
- 이 아이디와 패스워드로 로그인 하면 됨
- 새로 회원가입해도 상관없음

# Laundry & Roommate Management App

Flask + MySQL + OpenAI API + Android Studio 초기 프로젝트

---

## 서버 실행 방법 (Flask)

### 1. Python 3.10 이상 설치
(Team member에게 Python 설치 필요)

### 2. MySQL 설치
(MySQL Server를 설치하고, 비밀번호를 설정)

### 3. server/ 폴더로 이동

```bash
cd C:\Users\User\Desktop\project\server
```
(Team member 가 자신 홈파일에 맞게 이동)

### 4. 가상환경(venv) 생성 및 활성화
- 첫 한 번째에는 venv 생성

```bash
python -m venv venv
```

- Windows에서 venv 활성화

```bash
venv\Scripts\activate
```

- (venv)가 표시되어야 한다.

현황변환 예시:

```bash
(venv) PS C:\Users\User\Desktop\project\server>
```

> **\u2714\ufe0f 가상환경 (venv) 활성화하지 않으면 pip install, python app.py 작업이 잘 되지 않음!**


### 5. 필요한 패키지 설치

```bash
pip install -r requirements.txt
```

### 6. MySQL에 데이터비스 및 테이블 생성

```bash
mysql -u root -p < init_db.sql
```

(MySQL 비밀번호 입력)

### 7. .env 파일 생성 및 환경 변수 설정

- openai_api_key 발급받기 : https://platform.openai.com/settings/organization/api-keys
- 발급받은 후 server파일에 app.py 에서 17번째 줄 자기 key로 바꾸기

server/ 폴더에 `.env` 파일을 생성하고 다음과 같이 입력

```plaintext
OPENAI_API_KEY=your_openai_api_key -> 
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DB=laundry_db
MYSQL_HOST=localhost
```

(Team member 가 마지막 호출 필요)

### 8. Flask 서버 실행

```bash
python app.py
```

실행 결과:

```
 * Running on http://localhost:5000
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
SELECT user_id FROM user_tags WHERE tag = '#비흡연';
```
# 📄 Chat 상대 목록 조회 API 명세서

---

## ✅ 기능 개요

- 로그인된 사용자가 대화했던 사용자 목록을 가져오는 API입니다.
- 프론트에서는 이 목록을 버튼 또는 드롭다운 형태로 UI에 표시하고, 사용자가 선택할 수 있도록 해야 합니다.
- 이후 선택된 상대와의 채팅 로그를 불러오고 메시지를 전송하는 데 활용됩니다.

---

## 🔗 API Endpoint

```
GET /chat/partners/{user_id}
```

---

## 📥 요청 (Request)

**Path Parameter**

- `user_id` (string, 필수): 현재 로그인한 사용자 ID  
  예: `taeji1212`

**요청 예시**

```
GET /chat/partners/taeji1212
```

---

## 📤 응답 (Response)

**성공 시 (200 OK)**

```json
[
  "sugi2845",
  "hongmin91",
  "kuai_user3"
]
```

- 문자열 배열로 채팅 상대 ID 목록을 반환합니다.

**실패 시**

- 서버 오류 시: HTTP 500
- 잘못된 ID일 경우 빈 리스트 `[]` 반환 가능

---

## 🖼️ 프론트 적용 예시 (ChatActivity.kt 등)

```kotlin
val userList = listOf("sugi2845", "hongmin91")

userList.forEach { userId ->
    Button(onClick = { selectedUser = userId }) {
        Text(userId)
    }
}
```

---

## ⚠️ 주의사항

- 본인 ID가 포함될 수 있으므로 필요 시 프론트에서 필터링하세요.
- 채팅 경험이 없는 경우 빈 리스트가 반환될 수 있습니다.

---

## 🧱 Flask 서버 구현 위치

> `app.py` 파일 내 `# 채팅 상대 불러오기` 주석 아래에 다음 코드를 작성합니다.

```python
@app.route('/chat/partners/<user_id>', methods=['GET'])
def get_chat_partners(user_id):
    try:
        cursor = mysql.connection.cursor()
        
        # from_user 또는 to_user에 user_id가 포함된 경우, 상대방 ID만 추출
        query = """
            SELECT DISTINCT 
                CASE 
                    WHEN from_user = %s THEN to_user 
                    ELSE from_user 
                END AS partner
            FROM roommate_chats
            WHERE from_user = %s OR to_user = %s
        """
        cursor.execute(query, (user_id, user_id, user_id))
        result = cursor.fetchall()
        cursor.close()
        
        partners = [row[0] for row in result]
        return jsonify(partners), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

---

## 📌 이 API가 사용되는 위치 및 목적

- **채팅 상대 선택**: ChatActivity.kt 에서 `to_user` 입력을 자동화하는 데 사용됨
- **자동 메시지 갱신**: ChatScreen()에서 선택된 상대와의 대화 내역을 3초마다 갱신할 때 활용됨

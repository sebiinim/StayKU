package com.example.stayku

import android.content.Intent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp

@Composable
fun HomeScreen(userId: String, defaultPage: String = "home", onLogout: () -> Unit) {
    var currentPage by remember { mutableStateOf(defaultPage) }

    when (currentPage) {
        "home" -> {
            Column(modifier = Modifier.padding(16.dp)) {
                Text("환영합니다, $userId 님!")

                val context = LocalContext.current
                Button(onClick = {
                    val intent = Intent(context, ProfileActivity::class.java)
                    intent.putExtra("userId", userId)
                    context.startActivity(intent)
                }) {
                    Text("내 프로필 등록/수정")
                }

                Button(onClick = {
                    val intent = Intent(context, ChatActivity::class.java)
                    intent.putExtra("userId", userId)
                    context.startActivity(intent)
                }) {
                    Text("1:1 채팅하기")
                }

                Button(onClick = { currentPage = "tagMatch" }) {
                    Text("룸메 찾기")
                }

                Button(
                    onClick = {
                        onLogout()
                    },
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 32.dp)
                ) {
                    Text("로그아웃")
                }
            }
        }
        "profile" -> ProfileScreen(userId = userId)
        "chat" -> ChatScreen(userId = userId)
        "team" -> TeamScreen(userId = userId)
        "tagMatch" -> TagMatchScreen(userId = userId)
    }
}

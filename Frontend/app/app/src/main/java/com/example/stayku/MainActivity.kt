package com.example.stayku

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.stayku.ui.theme.StayKUTheme
import androidx.compose.ui.platform.LocalContext
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable

// MainActivity: 앱의 첫 번째 화면을 담당하는 Activity
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // ① 외부에서 전달된 userId/page가 있는지 확인
        val passedUserId = intent.getStringExtra("userId")
        val defaultPage = intent.getStringExtra("page") ?: "home"

        setContent {
            StayKUTheme {
                var loggedInUserId by remember { mutableStateOf(passedUserId) }
                var isRegistering by remember { mutableStateOf(false) }

                when {
                    loggedInUserId != null -> {
                        HomeScreen(
                            userId = loggedInUserId!!,
                            defaultPage = defaultPage,
                            onLogout = { loggedInUserId = null }
                        )
                    }

                    isRegistering -> {
                        RegisterScreen(
                            onRegisterSuccess = { newUserId ->
                                loggedInUserId = newUserId
                                isRegistering = false
                            }
                        )
                    }

                    else -> {
                        LoginScreen(
                            onLoginSuccess = { userId ->
                                loggedInUserId = userId
                            },
                            onRegisterClick = {
                                isRegistering = true
                            }
                        )
                    }
                }
            }
        }
    }
}

// MainScreen: 메인 화면 UI를 구성하는 함수
@Composable
fun MainScreen() {
    val context = LocalContext.current // Composable 안에서 context 가져오기

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Center
    ) {
        // 프로필 등록 화면 이동 버튼
        Button(
            onClick = {
                context.startActivity(Intent(context, ProfileActivity::class.java))
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("프로필 등록하기")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // 채팅 화면 이동 버튼
        Button(
            onClick = {
                context.startActivity(Intent(context, ChatActivity::class.java))
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("채팅하기")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // 팀 구성 화면 이동 버튼
        Button(
            onClick = {
                context.startActivity(Intent(context, TeamActivity::class.java))
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("팀 구성하기")
        }
    }
}

// Android Studio 미리보기용
@Preview(showBackground = true)
@Composable
fun MainScreenPreview() {
    StayKUTheme {
        MainScreen()
    }
}

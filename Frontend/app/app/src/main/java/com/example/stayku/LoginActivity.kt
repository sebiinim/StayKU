// LoginActivity.kt
package com.example.stayku

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.example.stayku.ui.theme.StayKUTheme

class LoginActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            StayKUTheme {
                LoginScreen(
                    onLoginSuccess = { userId ->
                        // TODO: Login 성공 시 이동 (필요 시 구현)
                    },
                    onRegisterClick = {
                        // TODO: 회원가입으로 이동 (필요 시 구현)
                    }
                )
            }
        }
    }
}

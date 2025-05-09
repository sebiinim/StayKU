package com.example.stayku

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Composable
fun LoginScreen(
    onLoginSuccess: (String) -> Unit,
    onRegisterClick: () -> Unit
) {
    var userId by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var error by remember { mutableStateOf("") }

    Column(modifier = Modifier.padding(16.dp)) {
        OutlinedTextField(value = userId, onValueChange = { userId = it }, label = { Text("아이디") })
        OutlinedTextField(value = password, onValueChange = { password = it }, label = { Text("비밀번호") })

        Spacer(modifier = Modifier.height(16.dp))

        Button(onClick = {
            val request = mapOf("user_id" to userId, "password" to password)
            RetrofitClient.instance.login(request).enqueue(object : Callback<Map<String, Any>> {
                override fun onResponse(call: Call<Map<String, Any>>, response: Response<Map<String, Any>>) {
                    if (response.isSuccessful && response.body()?.get("status") == "success") {
                        onLoginSuccess(userId)
                    } else {
                        error = response.body()?.get("message")?.toString() ?: "로그인 실패"
                    }
                }

                override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                    error = "서버 오류"
                }
            })
        }, modifier = Modifier.fillMaxWidth()) {
            Text("로그인")
        }

        Spacer(modifier = Modifier.height(8.dp))

        Button(onClick = onRegisterClick, modifier = Modifier.fillMaxWidth()) {
            Text("회원가입")
        }

        if (error.isNotEmpty()) {
            Spacer(modifier = Modifier.height(8.dp))
            Text(error, color = Color.Red)
        }
    }
}

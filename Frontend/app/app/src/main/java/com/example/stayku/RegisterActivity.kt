package com.example.stayku

import androidx.compose.runtime.*
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

@Composable
fun LoginOrRegisterChoice(
    onLogin: (String) -> Unit,
    onRegister: () -> Unit
) {
    var tempId by remember { mutableStateOf("") }

    Column(modifier = Modifier.padding(16.dp)) {
        OutlinedTextField(
            value = tempId,
            onValueChange = { tempId = it },
            label = { Text("로그인할 ID 입력") }
        )

        Spacer(modifier = Modifier.height(8.dp))

        Button(onClick = { onLogin(tempId) }, modifier = Modifier.fillMaxWidth()) {
            Text("로그인")
        }

        Spacer(modifier = Modifier.height(8.dp))

        Button(onClick = onRegister, modifier = Modifier.fillMaxWidth()) {
            Text("회원가입")
        }
    }
}

@Composable
fun RegisterScreen(onRegisterSuccess: (String) -> Unit) {
    var userId by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    var error by remember { mutableStateOf("") }

    Column(modifier = Modifier.padding(16.dp)) {
        OutlinedTextField(value = userId, onValueChange = { userId = it }, label = { Text("아이디") })
        OutlinedTextField(value = password, onValueChange = { password = it }, label = { Text("비밀번호") })

        Spacer(modifier = Modifier.height(16.dp))

        Button(onClick = {
            val data = mapOf("user_id" to userId, "password" to password)
            RetrofitClient.instance.register(data).enqueue(object : Callback<Map<String, Any>> {
                override fun onResponse(call: Call<Map<String, Any>>, response: Response<Map<String, Any>>) {
                    if (response.isSuccessful && response.body()?.get("status") == "success") {
                        onRegisterSuccess(userId)
                    } else {
                        error = response.body()?.get("message")?.toString() ?: "회원가입 실패"
                    }
                }

                override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                    error = "서버 오류"
                }
            })
        }, modifier = Modifier.fillMaxWidth()) {
            Text("회원가입 완료 후 프로필 등록")
        }

        if (error.isNotEmpty()) {
            Spacer(modifier = Modifier.height(8.dp))
            Text(error, color = Color.Red)
        }
    }
}

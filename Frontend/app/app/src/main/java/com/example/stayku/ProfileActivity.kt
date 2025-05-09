package com.example.stayku

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.example.stayku.ui.theme.StayKUTheme
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import androidx.compose.ui.platform.LocalContext
import android.app.Activity
import android.content.Intent

class ProfileActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val userId = intent.getStringExtra("userId") ?: ""
        setContent {
            StayKUTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    ProfileScreen(userId = userId)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(userId: String) {
    var isMorningPerson by remember { mutableStateOf(true) }
    var isSmoker by remember { mutableStateOf(false) }
    var snoreLevel by remember { mutableStateOf(3f) }
    var hygieneLevel by remember { mutableStateOf(3f) }
    var hallType by remember { mutableStateOf("신관") }
    var resultText by remember { mutableStateOf("") }

    val hallTypeOptions = listOf("신관", "구관")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Top
    ) {

        Spacer(modifier = Modifier.height(16.dp))

        // 주행성/야행성 스위치
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("주행성 (ON) / 야행성 (OFF)")
            Switch(checked = isMorningPerson, onCheckedChange = { isMorningPerson = it })
        }

        Spacer(modifier = Modifier.height(8.dp))

        // 흡연 여부 스위치
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("비흡연 (ON) / 흡연 (OFF)")
            Switch(checked = !isSmoker, onCheckedChange = { isSmoker = !it })
        }

        Spacer(modifier = Modifier.height(8.dp))

        // 코골이 여부 슬라이더
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Text("코골이 정도: ${snoreLevel.toInt()}")
            Slider(
                value = snoreLevel,
                onValueChange = { snoreLevel = it },
                valueRange = 1f..5f,
                steps = 3
            )
        }

        Spacer(modifier = Modifier.height(8.dp))

        // 위생 수준 슬라이더
        Text("위생 수준: ${hygieneLevel.toInt()}")
        Slider(
            value = hygieneLevel,
            onValueChange = { hygieneLevel = it },
            valueRange = 1f..5f,
            steps = 3,
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // 신관/구관 드롭다운
        var expanded by remember { mutableStateOf(false) }

        ExposedDropdownMenuBox(
            expanded = expanded,
            onExpandedChange = { expanded = !expanded }
        ) {
            OutlinedTextField(
                value = hallType,
                onValueChange = {},
                label = { Text("기숙사 선택") },
                readOnly = true,
                trailingIcon = {
                    ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
                },
                modifier = Modifier.fillMaxWidth()
            )

            ExposedDropdownMenu(
                expanded = expanded,
                onDismissRequest = { expanded = false }
            ) {
                hallTypeOptions.forEach { option ->
                    DropdownMenuItem(
                        text = { Text(option) },
                        onClick = {
                            hallType = option
                            expanded = false
                        }
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // 프로필 등록 버튼
        Button(
            onClick = {
                val request = ProfileRequest(
                    user_id = userId,
                    is_morning_person = isMorningPerson,
                    is_smoker = isSmoker,
                    snore_level = snoreLevel.toInt(),
                    hygiene_level = hygieneLevel.toInt(),
                    hall_type = hallType
                )

                RetrofitClient.instance.registerProfile(request).enqueue(object: Callback<Map<String, Any>> {
                    override fun onResponse(call: Call<Map<String, Any>>, response: Response<Map<String, Any>>) {
                        resultText = "프로필 등록 완료!"
                    }

                    override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                        resultText = "실패: ${t.message}"
                    }
                })
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("프로필 등록")
        }

        Spacer(modifier = Modifier.height(16.dp))

        // 결과 메시지 표시
        Text(text = resultText)

        val context = LocalContext.current
        val activity = context as? Activity

        Button(
            onClick = {
                val intent = Intent(context, MainActivity::class.java)
                intent.putExtra("userId", userId) // 홈 화면에서 로그인 유지
                context.startActivity(intent)
                activity?.finish()
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(top = 16.dp)
        ) {
            Text("← 이전 화면으로")
        }
    }
}

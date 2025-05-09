package com.example.stayku

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.example.stayku.ui.theme.StayKUTheme
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import androidx.compose.ui.platform.LocalContext
import android.app.Activity
import android.content.Intent


// TeamActivity: 사용자들이 팀을 구성하는 화면
class TeamActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val userId = intent.getStringExtra("userId") ?: ""
        setContent {
            StayKUTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    TeamScreen(userId=userId)
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TeamScreen(userId: String) {
    var member2 by remember { mutableStateOf("") }
    var hallType by remember { mutableStateOf("신관") }
    var resultText by remember { mutableStateOf("") }

    val hallTypeOptions = listOf("신관", "구관")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.Top
    ) {
        Text("내 ID (자동): $userId")

        Spacer(modifier = Modifier.height(8.dp))

        // 팀원 2 입력 (로그인된 본인 외 나머지 구성원)
        OutlinedTextField(
            value = member2,
            onValueChange = { member2 = it },
            label = { Text("팀원 2 ID (본인 제외)") },
            modifier = Modifier.fillMaxWidth()
        )

        Spacer(modifier = Modifier.height(8.dp))

        // 신관/구관 선택 드롭다운
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

        Button(
            onClick = {
                val members = if (hallType == "신관") {
                    listOf(userId, member2)
                } else {
                    // 구관일 경우 팀원 3명 입력 필드가 추가돼야 함 (추후 확장)
                    listOf(userId, member2) // 임시로 2명만
                }

                val request = TeamRequest(
                    members = members,
                    hall_type = hallType
                )

                RetrofitClient.instance.createTeam(request).enqueue(object : Callback<Map<String, Any>> {
                    override fun onResponse(call: Call<Map<String, Any>>, response: Response<Map<String, Any>>) {
                        resultText = "팀 생성 완료!"
                    }

                    override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                        resultText = "에러 발생: ${t.message}"
                    }
                })
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("팀 생성하기")
        }

        Spacer(modifier = Modifier.height(16.dp))
        Text(text = resultText)

        val context = LocalContext.current
        val activity = context as? Activity

        Button(
            onClick = {
                val intent = Intent(context, MainActivity::class.java)
                intent.putExtra("userId", userId)
                context.startActivity(intent)
                activity?.finish()
            },
            modifier = Modifier
                .fillMaxWidth()
                .padding(vertical = 8.dp)
        ) {
            Text("← 이전 화면으로")
        }


    }
}

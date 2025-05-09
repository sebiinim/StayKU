package com.example.stayku

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import kotlinx.coroutines.delay
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.Alignment
import com.example.stayku.ui.theme.StayKUTheme
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.ui.platform.LocalContext
import android.app.Activity


// ChatActivity: 사용자가 다른 사용자에게 메시지를 보내는 화면
class ChatActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            StayKUTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    ChatScreen(userId = intent.getStringExtra("userId") ?: "")
                }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen(userId: String) {
    var toUser by remember { mutableStateOf("") }
    var message by remember { mutableStateOf("") }
    var chatHistory by remember { mutableStateOf(listOf<Map<String, Any>>()) }
    val context = LocalContext.current
    val activity = context as? Activity

    // 자동 갱신
    LaunchedEffect(userId, toUser) {
        if (userId.isNotBlank() && toUser.isNotBlank()) {
            while (true) {
                delay(3000)
                RetrofitClient.instance.getChats(userId, toUser).enqueue(object :
                    Callback<List<Map<String, Any>>> {
                    override fun onResponse(call: Call<List<Map<String, Any>>>, response: Response<List<Map<String, Any>>>) {
                        if (response.isSuccessful) {
                            chatHistory = response.body() ?: listOf()
                        }
                    }

                    override fun onFailure(call: Call<List<Map<String, Any>>>, t: Throwable) {}
                })
            }
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("채팅 화면") },
                navigationIcon = {
                    IconButton(onClick = { activity?.finish() }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "뒤로가기")
                    }
                }
            )
        },
        bottomBar = {
            Row(modifier = Modifier
                .padding(8.dp)
                .fillMaxWidth()) {
                OutlinedTextField(
                    value = message,
                    onValueChange = { message = it },
                    label = { Text("메시지 입력") },
                    modifier = Modifier.weight(1f)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Button(onClick = {
                    val request = ChatRequest(from_user = userId, to_user = toUser, message = message)
                    RetrofitClient.instance.sendChat(request).enqueue(object : Callback<Map<String, Any>> {
                        override fun onResponse(call: Call<Map<String, Any>>, response: Response<Map<String, Any>>) {
                            message = ""
                        }

                        override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {}
                    })
                }) {
                    Text("보내기")
                }
            }
        }
    ) { innerPadding ->
        Column(modifier = Modifier
            .padding(innerPadding)
            .padding(16.dp)
            .fillMaxSize()) {

            OutlinedTextField(
                value = toUser,
                onValueChange = { toUser = it },
                label = { Text("상대 ID (to_user)") },
                modifier = Modifier.fillMaxWidth()
            )

            Spacer(modifier = Modifier.height(8.dp))

            LazyColumn(
                modifier = Modifier
                    .weight(1f)
                    .fillMaxWidth()
            ) {
                items(chatHistory) { chat ->
                    val from = (chat["from_user"] ?: "").toString().trim()
                    val msg = chat["message"]?.toString() ?: ""
                    val isMine = from == userId.trim()

                    Row(
                        modifier = Modifier.fillMaxWidth().padding(4.dp),
                        horizontalArrangement = if (isMine) Arrangement.End else Arrangement.Start
                    ) {
                        Surface(
                            shape = MaterialTheme.shapes.medium,
                            tonalElevation = 2.dp,
                            color = if (isMine) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.secondary
                        ) {
                            Text(
                                text = msg,
                                color = MaterialTheme.colorScheme.onPrimary,
                                modifier = Modifier.padding(8.dp)
                            )
                        }
                    }
                }
            }
        }
    }
}


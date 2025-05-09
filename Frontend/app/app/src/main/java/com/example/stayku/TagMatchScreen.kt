package com.example.stayku

import android.os.Bundle
import android.widget.Toast
import android.app.Activity
import android.content.Intent
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import com.example.stayku.ui.theme.StayKUTheme
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class TagMatchActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val userId = intent.getStringExtra("userId") ?: ""
        setContent {
            StayKUTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    TagMatchScreen(userId)
                }
            }
        }
    }
}

@Composable
fun TagMatchScreen(userId: String) {
    val context = LocalContext.current
    val activity = context as? Activity
    var hasTags by remember { mutableStateOf<Boolean?>(null) }
    var userTags by remember { mutableStateOf<List<String>>(emptyList()) }

    LaunchedEffect(userId) {
        RetrofitClient.instance.getUserTags(userId).enqueue(object : Callback<List<String>> {
            override fun onResponse(call: Call<List<String>>, response: Response<List<String>>) {
                if (response.isSuccessful && !response.body().isNullOrEmpty()) {
                    userTags = response.body() ?: emptyList()
                    hasTags = true
                }
            }
            override fun onFailure(call: Call<List<String>>, t: Throwable) {
                hasTags = false
            }
        })
    }

    Column(modifier = Modifier.padding(16.dp).fillMaxSize()) {
        when (hasTags) {
            null -> Text("태그 정보를 불러오는 중입니다...")
            true -> {
                Text("이미 태그를 선택하셨습니다.")
                Spacer(modifier = Modifier.height(8.dp))

                userTags.forEach { tag ->
                    Text("• $tag")
                }

                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = {
                    val intent = Intent(context, TagMatchResultActivity::class.java)
                    intent.putExtra("userId", userId)
                    context.startActivity(intent)
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("매칭 시작")
                }

                Spacer(modifier = Modifier.height(8.dp))
                Button(onClick = {
                    val intent = Intent(context, TagSelectActivity::class.java)
                    intent.putExtra("userId", userId)
                    context.startActivity(intent)
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("태그 다시 선택하기")
                }
            }
            false -> {
                Text("태그 선택 이력이 없습니다.")
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = {
                    val intent = Intent(context, TagSelectActivity::class.java)
                    intent.putExtra("userId", userId)
                    context.startActivity(intent)
                }, modifier = Modifier.fillMaxWidth()) {
                    Text("태그 선택 시작")
                }
            }
        }
        Spacer(modifier = Modifier.height(32.dp))
        Button(onClick = { activity?.finish() }, modifier = Modifier.fillMaxWidth()) {
            Text("← 홈으로")
        }
    }
}

class TagMatchResultActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val userId = intent.getStringExtra("userId") ?: ""
        setContent {
            StayKUTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    TagMatchResultScreen(userId)
                }
            }
        }
    }
}

@Composable
fun TagMatchResultScreen(userId: String) {
    var matchedUsers by remember { mutableStateOf(listOf<Map<String, Any>>()) }
    LaunchedEffect(userId) {
        RetrofitClient.instance.getMatchedUsers(userId).enqueue(object : Callback<List<Map<String, Any>>> {
            override fun onResponse(call: Call<List<Map<String, Any>>>, response: Response<List<Map<String, Any>>>) {
                if (response.isSuccessful) {
                    matchedUsers = response.body() ?: listOf()
                }
            }
            override fun onFailure(call: Call<List<Map<String, Any>>>, t: Throwable) {}
        })
    }
    Column(modifier = Modifier.padding(16.dp)) {
        Text("추천된 룸메이트 목록")
        Spacer(modifier = Modifier.height(8.dp))
        matchedUsers.forEach { user ->
            val uid = user["user_id"]?.toString() ?: "(알 수 없음)"
            Text("- $uid")
        }
    }
}

class TagSelectActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val userId = intent.getStringExtra("userId") ?: ""
        setContent {
            StayKUTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    TagSelectScreen(userId)
                }
            }
        }
    }
}

@Composable
fun TagSelectScreen(userId: String) {
    val context = LocalContext.current
    val activity = context as? Activity
    val tagCategories = listOf(
        "생활 습관" to listOf("#아침형", "#저녁형", "#코골이심함", "#코골이없음"),
        "청결" to listOf("#깔끔한편", "#청소자주함", "#청소귀찮음", "#욕실깨끗히씀", "#정리정돈중요"),
        "흡연/음주" to listOf("#비흡연", "#흡연자", "#방밖에서흡연", "#술자주마심", "#술안마심"),
        "공부 스타일" to listOf("#조용히공부", "#음악들으며공부", "#밤샘잘함", "#회의많이함"),
        "취미/성향" to listOf("#게임좋아함", "#게임안함", "#운동자주함", "#외출많음", "#방에잘있음"),
        "성격" to listOf("#배려심있음", "#예민함", "#계획적", "#즉흥적", "#융통성있는편")
    )
    var currentCategoryIndex by remember { mutableStateOf(0) }
    val selectedTags = remember { mutableStateMapOf<String, List<String>>() }
    val currentSelections = remember { mutableStateListOf<String>() }
    val (categoryName, tagList) = tagCategories[currentCategoryIndex]
    Column(modifier = Modifier.padding(16.dp).fillMaxSize()) {
        Text("[$categoryName] 카테고리에서 최대 3개 선택")
        Spacer(modifier = Modifier.height(8.dp))
        tagList.forEach { tag ->
            val selected = tag in currentSelections
            Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
                Text(tag)
                Checkbox(
                    checked = selected,
                    onCheckedChange = {
                        if (it && currentSelections.size < 3) currentSelections.add(tag)
                        else if (!it) currentSelections.remove(tag)
                    }
                )
            }
        }
        Spacer(modifier = Modifier.height(16.dp))
        Button(
            onClick = {
                if (currentSelections.isEmpty()) {
                    Toast.makeText(context, "최소 1개 이상 선택해야 합니다.", Toast.LENGTH_SHORT).show()
                    return@Button
                }
                selectedTags[categoryName] = currentSelections.toList()
                currentSelections.clear()
                if (currentCategoryIndex < tagCategories.lastIndex) {
                    currentCategoryIndex++
                } else {
                    val allSelected = selectedTags.values.flatten()
                    val request = TagRequest(user_id = userId, tags = allSelected)
                    RetrofitClient.instance.saveUserTags(request).enqueue(object : Callback<Map<String, Any>> {
                        override fun onResponse(call: Call<Map<String, Any>>, response: Response<Map<String, Any>>) {
                            val intent = Intent(context, MainActivity::class.java)
                            intent.putExtra("userId", userId)
                            intent.putExtra("page", "tagMatch")
                            context.startActivity(intent)
                            activity?.finish()
                        }
                        override fun onFailure(call: Call<Map<String, Any>>, t: Throwable) {
                            Toast.makeText(context, "저장 실패", Toast.LENGTH_SHORT).show()
                        }
                    })
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text(if (currentCategoryIndex == tagCategories.lastIndex) "저장하기" else "다음")
        }
    }
}

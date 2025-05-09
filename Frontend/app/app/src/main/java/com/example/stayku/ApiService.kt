package com.example.stayku

import retrofit2.Call
import retrofit2.http.*

// 프로필 등록 요청 모델
data class ProfileRequest(
    val user_id: String,
    val is_morning_person: Boolean,
    val is_smoker: Boolean,
    val snore_level: Int,
    val hygiene_level: Int,
    val hall_type: String
)

// 채팅 메시지 전송 요청 모델
data class ChatRequest(
    val from_user: String,
    val to_user: String,
    val message: String
)

// 팀 생성 요청 모델
data class TeamRequest(
    val members: List<String>, // 팀 멤버 리스트
    val hall_type: String // 신관 or 구관
)

// 태그 저장 요청 모델
data class TagRequest(
    val user_id: String,
    val tags: List<String>
)

// 서버와 통신하는 API 인터페이스 정의
interface ApiService {

    // 프로필 등록 API (POST /profile)
    @POST("/profile")
    fun registerProfile(@Body request: ProfileRequest): Call<Map<String, Any>>

    // 회원가입 API 정의
    @POST("/register")
    @Headers("Content-Type: application/json")
    fun register(@Body userInfo: Map<String, String>): Call<Map<String, Any>>

    // 로그인 API 정의
    @POST("/login")
    @Headers("Content-Type: application/json")
    fun login(@Body credentials: Map<String, String>): Call<Map<String, Any>>

    // 채팅 메시지 전송 API (POST /chat)
    @POST("/chat")
    fun sendChat(@Body request: ChatRequest): Call<Map<String, Any>>

    // 채팅 내역 가져오기 API (GET /chat/{from_user}/{to_user})
    @GET("/chat/{from_user}/{to_user}")
    fun getChats(@Path("from_user") fromUser: String, @Path("to_user") toUser: String): Call<List<Map<String, Any>>>

    // 팀 생성 API (POST /team)
    @POST("/team")
    fun createTeam(@Body request: TeamRequest): Call<Map<String, Any>>

    // 태그 저장
    @POST("/tags")
    fun saveUserTags(@Body request: TagRequest): Call<Map<String, Any>>

    // 태그 조회
    @GET("/tags/{user_id}")
    fun getUserTags(@Path("user_id") userId: String): Call<List<String>>

    // 매칭 사용자 추천
    @GET("/match/{user_id}")
    fun getMatchedUsers(@Path("user_id") userId: String): Call<List<Map<String, Any>>>

}

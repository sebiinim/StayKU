package com.example.stayku

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

// RetrofitClient: 서버와 통신하기 위한 Retrofit 설정 객체
object RetrofitClient {
    // Flask 서버의 기본 URL (에뮬레이터에서는 localhost 대신 10.0.2.2 사용)
    private const val BASE_URL = "http://10.0.2.2:5000"

    // instance: Retrofit 객체를 생성하고, ApiService 인터페이스를 구현
    val instance: ApiService by lazy {
        val retrofit = Retrofit.Builder()
            .baseUrl(BASE_URL) // 서버 URL 설정
            .addConverterFactory(GsonConverterFactory.create()) // JSON 변환기 사용 설정
            .build()

        retrofit.create(ApiService::class.java) // ApiService 인터페이스를 구현한 객체 생성
    }
}

package com.leavelive.diary.service

import com.leavelive.diary.model.payload.DiaryRequest
import com.leavelive.diary.model.payload.DiaryResponse
import com.leavelive.diary.repository.DiaryRepository
import com.leavelive.diary.utils.JwtUtil
import org.springframework.stereotype.Service

@Service
class DiaryService(private val diaryRepository: DiaryRepository) {

    fun get(){}

    fun getAllPublicDiaries(){}

    fun register(token:String, diaryRequest: DiaryRequest) : DiaryResponse {
        val userId = JwtUtil.decodeToken(token)
        return DiaryResponse()
    }

    fun edit(){}

    fun remove(){}
}
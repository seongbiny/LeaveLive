package com.leavelive.diary.service

import com.leavelive.diary.model.Diary
import com.leavelive.diary.model.payload.DiaryRequest
import com.leavelive.diary.model.payload.DiaryResponse
import com.leavelive.diary.repository.DiaryRepository
import com.leavelive.diary.utils.JwtUtil
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Service
import java.time.LocalDate
import java.time.format.DateTimeFormatter

@Service
class DiaryService(private val diaryRepository: DiaryRepository, private val modelMapper: ModelMapper) {

    fun get(token: String, date: String): DiaryResponse {
        val userId = JwtUtil.decodeToken(token)
        return modelMapper.map(
            diaryRepository.findByUserIdAndDate(
                userId,
                LocalDate.parse(date, DateTimeFormatter.ISO_DATE)
            ).get(), DiaryResponse::class.java
        )
    }

    fun getAllPublicDiaries() {}

    fun register(token: String, diaryRequest: DiaryRequest): DiaryResponse {
        val userId = JwtUtil.decodeToken(token)
        val diary = modelMapper.map(diaryRequest, Diary::class.java)
        diary.userId = userId
        return modelMapper.map(
            diaryRepository.save(diary), DiaryResponse::class.java
        )
    }

    fun edit(token: String, diaryRequest: DiaryRequest, diaryId: Long): DiaryResponse {
        val userId = JwtUtil.decodeToken(token)
        val diary = diaryRepository.findById(diaryId).get()
        modelMapper.map(diaryRequest, diary)
        return modelMapper.map(diaryRepository.save(diary), DiaryResponse::class.java)
    }

    fun remove() {}
}
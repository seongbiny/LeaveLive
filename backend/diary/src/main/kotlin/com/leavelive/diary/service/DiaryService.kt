package com.leavelive.diary.service

import com.leavelive.diary.model.Diary
import com.leavelive.diary.model.Status
import com.leavelive.diary.model.payload.DiaryRequest
import com.leavelive.diary.model.payload.DiaryResponse
import com.leavelive.diary.repository.DiaryRepository
import com.leavelive.diary.utils.JwtUtil
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

@Service
class DiaryService(
    private val diaryRepository: DiaryRepository,
    private val modelMapper: ModelMapper
) {

    fun get(token: String, date: String): DiaryResponse {
        val userId = JwtUtil.decodeToken(token)
        return try {
            modelMapper.map(
                diaryRepository.findByUserIdAndDate(
                    userId,
                    LocalDate.parse(date, DateTimeFormatter.ISO_DATE)
                ).get(), DiaryResponse::class.java
            )
        } catch (e: NoSuchElementException) {
            DiaryResponse()
        }
    }

    fun getAllDiaries(token: String): List<DiaryResponse> {
        val userId = JwtUtil.decodeToken(token)
        return diaryRepository.findAllByUserId(userId).map { modelMapper.map(it, DiaryResponse::class.java) }
    }

    fun getAllPublicDiaries(): List<DiaryResponse> =
        diaryRepository.findAllByStatus(Status.PUBLIC).map { modelMapper.map(it, DiaryResponse::class.java) }

    fun register(token: String, diaryRequest: DiaryRequest, images: List<MultipartFile>): DiaryResponse {
        val userId = JwtUtil.decodeToken(token)
        val diary = modelMapper.map(diaryRequest, Diary::class.java)
        diary.userId = userId // foreign key set
        images.let {
            diary.picPath = saveImages(it)
        }
        return modelMapper.map(
            diaryRepository.save(diary), DiaryResponse::class.java
        )
    }

    fun edit(token: String, diaryRequest: DiaryRequest, images: List<MultipartFile>, diaryId: Long): DiaryResponse {
        val userId = JwtUtil.decodeToken(token)
        val diary = diaryRepository.findById(diaryId).get()
        if (diary.userId != userId) throw RuntimeException("user id doesn't match")
        modelMapper.map(diaryRequest, diary)
        images.let {
            diary.picPath = saveImages(it)
        }
        return modelMapper.map(diaryRepository.save(diary), DiaryResponse::class.java)
    }

    fun remove(token: String, diaryId: Long): Boolean {
        val userId = JwtUtil.decodeToken(token)
        val diary = diaryRepository.findById(diaryId).get()
        if (diary.userId != userId) throw RuntimeException("user id doesn't match")
        diaryRepository.delete(diary)
        return true
    }

    private fun saveImages(images: List<MultipartFile>): String {
        var picPath = ""
        val path = "/home/ubuntu/images/diary"
        images.forEach {
            it.let {
                var uniquePath = "${LocalDate.now().format(DateTimeFormatter.ISO_DATE)}${UUID.randomUUID()}"
                when (it.contentType?.lowercase()) {
                    "image/png" -> uniquePath += ".png"
                    "image/jpeg" -> uniquePath += ".jpeg"
                }
                val file = File(path)
                if (!file.exists()) file.mkdirs()
                it.transferTo(File("$path/${uniquePath}"))
                picPath += "diary/${uniquePath},"
            }
        }
        return picPath.substring(0, picPath.length - 1)
    }
}
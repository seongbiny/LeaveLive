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
import kotlin.io.path.Path

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
        images.map {
            val uniquePath = "${LocalDate.now().format(DateTimeFormatter.ISO_DATE)}${UUID.randomUUID()}"
            var path =
                "${File.separator}home${File.separator}ubuntu${File.separator}images${File.separator}diary${File.separator}${uniquePath}"
            when (it.contentType?.lowercase()) {
                "image/png" -> path += ".png"
                "image/jpeg" -> path += ".jpeg"
            }
            it.transferTo(Path(path))
            picPath += "$path, "
        }

        return picPath.substring(0, picPath.length - 1)
    }
}
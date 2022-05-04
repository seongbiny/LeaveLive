package com.leavelive.diary.controller

import com.leavelive.diary.model.payload.DiaryRequest
import com.leavelive.diary.model.payload.DiaryResponse
import com.leavelive.diary.service.DiaryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.time.LocalDate

@RestController
@RequestMapping("/api/diary")
class DiaryController(private val diaryService: DiaryService) {

    @GetMapping
    fun get(
        @RequestHeader(name = "Authorization") token: String,
        @RequestParam date: String
    ): ResponseEntity<DiaryResponse> = ResponseEntity(diaryService.get(token, date), HttpStatus.OK)

    @GetMapping("/test")
    fun getAllPublicDiaries() {
    }

    @PostMapping
    fun register(
        @RequestHeader(name = "Authorization") token: String,
        @RequestBody diaryRequest: DiaryRequest
    ): ResponseEntity<DiaryResponse> = ResponseEntity(diaryService.register(token, diaryRequest), HttpStatus.OK)

    @PatchMapping("/{diaryId}")
    fun edit(
        @RequestHeader(name = "Authorization") token: String,
        @RequestBody diaryRequest: DiaryRequest,
        @PathVariable diaryId : Long
    ): ResponseEntity<DiaryResponse> = ResponseEntity(diaryService.edit(token, diaryRequest, diaryId), HttpStatus.OK)

    @DeleteMapping("/{diaryId}")
    fun remove() {
    }
}
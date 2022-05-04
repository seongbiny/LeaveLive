package com.leavelive.diary.controller

import com.leavelive.diary.model.payload.DiaryRequest
import com.leavelive.diary.model.payload.DiaryResponse
import com.leavelive.diary.service.DiaryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/diary")
class DiaryController(private val diaryService: DiaryService) {

    @GetMapping
    fun get(
        @RequestHeader(name = "Authorization") token: String,
        @RequestParam date: String
    ): ResponseEntity<DiaryResponse> = ResponseEntity(diaryService.get(token, date), HttpStatus.OK)

    @GetMapping("/public")
    fun getAllPublicDiaries(): ResponseEntity<List<DiaryResponse>> =
        ResponseEntity(diaryService.getAllPublicDiaries(), HttpStatus.OK)

    @PostMapping
    fun register(
        @RequestHeader(name = "Authorization") token: String,
        @RequestBody diaryRequest: DiaryRequest
    ): ResponseEntity<DiaryResponse> = ResponseEntity(diaryService.register(token, diaryRequest), HttpStatus.OK)

    @PatchMapping("/{diaryId}")
    fun edit(
        @RequestHeader(name = "Authorization") token: String,
        @RequestBody diaryRequest: DiaryRequest,
        @PathVariable diaryId: Long
    ): ResponseEntity<DiaryResponse> = ResponseEntity(diaryService.edit(token, diaryRequest, diaryId), HttpStatus.OK)

    @DeleteMapping("/{diaryId}")
    fun remove(
        @RequestHeader(name = "Authorization") token: String, @PathVariable diaryId: Long
    ): ResponseEntity<Boolean> = ResponseEntity(diaryService.remove(token, diaryId), HttpStatus.OK)
}
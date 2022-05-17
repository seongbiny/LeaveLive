package com.leavelive.diary.controller

import com.leavelive.diary.model.payload.DiaryRequest
import com.leavelive.diary.model.payload.DiaryResponse
import com.leavelive.diary.service.DiaryService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.Parameters
import io.swagger.v3.oas.annotations.headers.Header
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.media.Schema
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/diary")
class DiaryController(private val diaryService: DiaryService) {

    @GetMapping
    @Operation(summary = "다이어리 조회", description = "특정 회원이 특정 날짜에 작성한 다이어리를 조회한다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
        Parameter(name = "date", description = "조회할 날짜", example = "YYYY-MM-DD")
    )
    fun getDiary(
        @RequestHeader(name = "Authorization") token: String,
        @RequestParam date: String
    ): ResponseEntity<DiaryResponse> = ResponseEntity(diaryService.get(token, date), HttpStatus.OK)

    @GetMapping("/my-diary")
    @Operation(summary = "나의 모든 다이어리 조회", description = "특정 회원이 특정 날짜에 작성한 다이어리를 조회한다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
    )
    fun getAllDiaries(@RequestHeader(name = "Authorization") token: String): ResponseEntity<List<DiaryResponse>> =
        ResponseEntity(diaryService.getAllDiaries(token), HttpStatus.OK)

    @Operation(summary = "공유된 다이어리 조회", description = "공유된 모든 다이어리를 조회한다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @GetMapping("/public")
    fun getAllPublicDiaries(): ResponseEntity<List<DiaryResponse>> =
        ResponseEntity(diaryService.getAllPublicDiaries(), HttpStatus.OK)


    @GetMapping("/search/{tag}")
    fun getAllPublicDiariesByTag(@PathVariable tag: String) : ResponseEntity<List<DiaryResponse>>
    = ResponseEntity(diaryService.getAllPublicDiariesByTag(tag), HttpStatus.OK)


    @Operation(summary = "다이어리 등록", description = "다이어리를 등록합니다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
        Parameter(name = "diaryRequest", description = "다이어리 요청 DTO"),
        Parameter(name = "images", description = "이미지 파일")
    )
    @PostMapping
    fun registerDiary(
        @RequestHeader(name = "Authorization") token: String,
        @RequestPart(value = "diaryRequest") diaryRequest: DiaryRequest,
        @RequestPart(value = "images", required = false) images: List<MultipartFile>
    ): ResponseEntity<DiaryResponse> = ResponseEntity(diaryService.register(token, diaryRequest, images), HttpStatus.OK)

    @Operation(summary = "다이어리 수정", description = "다이어리를 수정합니다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
        Parameter(name = "diaryRequest", description = "다이어리 요청 DTO"),
        Parameter(name = "images", description = "이미지 파일"),
        Parameter(name = "diaryId", description = "수정할 다이어리 번호")
    )
    @PatchMapping("/{diaryId}")
    fun editDiary(
        @RequestHeader(name = "Authorization") token: String,
        @RequestPart(value = "diaryRequest") diaryRequest: DiaryRequest,
        @RequestPart(value = "images", required = false) images: List<MultipartFile>,
        @PathVariable diaryId: Long
    ): ResponseEntity<DiaryResponse> =
        ResponseEntity(diaryService.edit(token, diaryRequest, images, diaryId), HttpStatus.OK)

    @Operation(summary = "다이어리 삭제", description = "다이어리를 삭제합니다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
        Parameter(name = "diaryId", description = "삭제할 다이어리 번호")
    )
    @DeleteMapping("/{diaryId}")
    fun removeDiary(
        @RequestHeader(name = "Authorization") token: String, @PathVariable diaryId: Long
    ): ResponseEntity<Boolean> = ResponseEntity(diaryService.remove(token, diaryId), HttpStatus.OK)
}
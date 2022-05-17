package com.ssafy.leavelive.business.user.controller

import com.ssafy.leavelive.business.user.model.payload.UserRequest
import com.ssafy.leavelive.business.user.model.payload.UserResponse
import com.ssafy.leavelive.business.user.service.UserService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.Parameters
import io.swagger.v3.oas.annotations.media.Content
import io.swagger.v3.oas.annotations.responses.ApiResponse
import io.swagger.v3.oas.annotations.responses.ApiResponses
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

private const val AUTHORIZATION = "Authorization"

@RestController
@RequestMapping("/api/user")
class UserController(private val userService: UserService) {

    @Operation(summary = "사용자 정보 조회", description = "사용자 정보를 조회한다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
    )
    @GetMapping
    fun getInformation(@RequestHeader(name = AUTHORIZATION) token: String): ResponseEntity<UserResponse> =
        ResponseEntity(userService.getUser(token), HttpStatus.OK)

    @Operation(summary = "사용자 프로필 정보 조회", description = "해당하는 아이디의 사용자 닉네임과 프로필사진 경로를 조회한다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
    )
    @GetMapping("/{userId}")
    fun getUserProfile(
        @RequestHeader(name = AUTHORIZATION) token: String,
        @PathVariable userId: String
    ): ResponseEntity<Map<String, String>> = ResponseEntity(userService.getProfileInfo(userId), HttpStatus.OK)

    @Operation(summary = "회원가입", description = "서드 파티 인증 서버에서 사용하는 회원가입 기능")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
        Parameter(name = "userRequest", description = "사용자 요청 DTO")
    )
    @PostMapping
    fun register(
        @RequestHeader(name = AUTHORIZATION) token: String,
        @RequestBody userRequest: UserRequest
    ): ResponseEntity<UserResponse> =
        ResponseEntity(userService.saveUser(token, userRequest), HttpStatus.OK)


    @Operation(summary = "사용자 정보 수정", description = "사용자 정보를 수정한다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
        Parameter(name = "userRequest", description = "사용자 요청 DTO")
    )
    @PatchMapping
    fun editInformation(
        @RequestHeader(name = AUTHORIZATION) token: String,
        @RequestBody userRequest: UserRequest,
    ): ResponseEntity<UserResponse> =
        ResponseEntity(userService.patchUser(token, userRequest), HttpStatus.OK)


    @Operation(summary = "프로필 이미지 업로드", description = "사용자 프로필 이미지를 업로드한다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
        Parameter(name = "image", description = "프로필로 사용할 사진")
    )
    @PatchMapping("/image", consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun uploadProfileImage(
        @RequestHeader(name = AUTHORIZATION) token: String,
        @RequestBody image: MultipartFile
    ): ResponseEntity<String> =
        ResponseEntity(userService.uploadProfileImage(token, image), HttpStatus.OK)

    @Operation(summary = "회원 탈퇴", description = "액세스 토큰 내부 사용자 아이디로 회원 탈퇴를 시도한다")
    @ApiResponses(
        ApiResponse(responseCode = "200", description = "OK"),
        ApiResponse(responseCode = "401", description = "액세스 토큰이 유효하지 않습니다"),
        ApiResponse(responseCode = "403", description = "액세스 토큰이 만료되었습니다"),
        ApiResponse(responseCode = "500", description = "해당하는 사용자 아이디가 없어서 예외가 발생한 경우")
    )
    @Parameters(
        Parameter(name = "Authorization", description = "액세스 토큰"),
    )
    @DeleteMapping
    fun withdraw(@RequestHeader(name = AUTHORIZATION) token: String): ResponseEntity<Boolean> =
        ResponseEntity(userService.removeUser(token), HttpStatus.OK)


}
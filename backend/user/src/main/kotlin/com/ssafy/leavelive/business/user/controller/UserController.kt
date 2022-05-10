package com.ssafy.leavelive.business.user.controller

import com.ssafy.leavelive.business.user.model.payload.UserRequest
import com.ssafy.leavelive.business.user.model.payload.UserResponse
import com.ssafy.leavelive.business.user.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

private const val AUTHORIZATION = "Authorization"

@RestController
@RequestMapping("/api/user")
class UserController(private val userService: UserService) {

    @GetMapping
    fun getInformation(@RequestHeader(name = AUTHORIZATION) token: String): ResponseEntity<UserResponse> =
        ResponseEntity(userService.getUser(token), HttpStatus.OK)

    @PostMapping
    fun register(
        @RequestHeader(name = AUTHORIZATION) token: String,
        @RequestBody userRequest: UserRequest
    ): ResponseEntity<UserResponse> =
        ResponseEntity(userService.saveUser(token, userRequest), HttpStatus.OK)


    @PatchMapping
    fun editInformation(
        @RequestHeader(name = AUTHORIZATION) token: String,
        @RequestBody userRequest: UserRequest,
    ): ResponseEntity<UserResponse> =
        ResponseEntity(userService.patchUser(token, userRequest), HttpStatus.OK)


    @PatchMapping("/image")
    fun uploadProfileImage(
        @RequestHeader(name = AUTHORIZATION) token: String,
        @RequestBody image: MultipartFile
    ): ResponseEntity<String> =
        ResponseEntity(userService.uploadProfileImage(token, image), HttpStatus.OK)


    @DeleteMapping
    fun withdraw() {
    }

}
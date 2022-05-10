package com.ssafy.leavelive.business.user.controller

import com.ssafy.leavelive.business.user.model.payload.UserRequest
import com.ssafy.leavelive.business.user.model.payload.UserResponse
import com.ssafy.leavelive.business.user.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/user")
class UserController(private val userService: UserService) {

    @GetMapping
    fun getInformation(@RequestHeader(name = "Authorization") token: String): ResponseEntity<UserResponse> =
        ResponseEntity(userService.getUser(token), HttpStatus.OK)

    @PostMapping
    fun register(
        @RequestHeader(name = "Authorization") token: String,
        @RequestBody userRequest: UserRequest
    ): ResponseEntity<UserResponse> {
        return ResponseEntity(userService.saveUser(token, userRequest), HttpStatus.OK)
    }

    @PatchMapping
    fun editInformation(
        @RequestHeader(name = "Authorization") token: String,
        @RequestPart(value = "userRequest") userRequest: UserRequest,
        @RequestPart(value = "image") image: MultipartFile
    ): ResponseEntity<UserResponse> {
        return ResponseEntity(userService.patchUser(token, userRequest, image), HttpStatus.OK)
    }

    @DeleteMapping
    fun withdraw() {
    }

}
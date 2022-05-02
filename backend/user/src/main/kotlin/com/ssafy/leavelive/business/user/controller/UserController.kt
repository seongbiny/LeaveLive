package com.ssafy.leavelive.business.user.controller

import com.ssafy.leavelive.business.user.model.payload.UserRequest
import com.ssafy.leavelive.business.user.model.payload.UserResponse
import com.ssafy.leavelive.business.user.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

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
        @RequestBody userRequest: UserRequest
    ): ResponseEntity<UserResponse> {
        return ResponseEntity(userService.patchUser(token, userRequest), HttpStatus.OK)
    }

    @DeleteMapping
    fun withdraw() {
    }

    @GetMapping("/{userId}")
    fun check(@PathVariable userId: String): ResponseEntity<Boolean> {
        return ResponseEntity(userService.exists(userId), HttpStatus.OK)
    }

    @GetMapping("/refresh-token")
    fun validateRefreshToken(@RequestHeader(name = "Refresh-Token") token: String): ResponseEntity<Boolean> =
        ResponseEntity(userService.validateRefreshToken(token), HttpStatus.OK)

}
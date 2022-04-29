package com.ssafy.leavelive.business.user.controller

import com.ssafy.leavelive.business.user.model.User
import com.ssafy.leavelive.business.user.model.payload.UserResponse
import com.ssafy.leavelive.business.user.service.UserService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/user")
class UserController(private val userService: UserService) {

    @PostMapping
    fun register(@RequestBody body: Map<String, Any>) :ResponseEntity<UserResponse>{
        return ResponseEntity(userService.saveUser(body), HttpStatus.OK)
    }
    @PatchMapping
    fun editInformation() {}

    @DeleteMapping
    fun withdraw() {}

    @GetMapping("/{userId}")
    fun check(@PathVariable userId: String) : ResponseEntity<Boolean> {
        return ResponseEntity(userService.exists(userId), HttpStatus.OK)
    }

}
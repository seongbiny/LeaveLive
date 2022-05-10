package com.ssafy.leavelive.business.user.controller

import com.ssafy.leavelive.business.user.service.UserInternalService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/user")
class UserInternalController(private val userInternalService: UserInternalService) {

    @GetMapping("/{userId}")
    fun check(@PathVariable userId: String): ResponseEntity<Boolean> =
        ResponseEntity(userInternalService.exists(userId), HttpStatus.OK)


    @GetMapping("/refresh-token")
    fun validateRefreshToken(@RequestParam token: String): ResponseEntity<Boolean> =
        ResponseEntity(userInternalService.validateRefreshToken(token), HttpStatus.OK)

    @GetMapping("/refresh-token/{userId}")
    fun getRefreshToken(@PathVariable userId: String): ResponseEntity<String> =
        ResponseEntity(userInternalService.getRefreshToken(userId), HttpStatus.OK)

}
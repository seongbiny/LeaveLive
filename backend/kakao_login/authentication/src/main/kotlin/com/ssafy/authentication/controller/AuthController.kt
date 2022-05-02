package com.ssafy.authentication.controller

import com.ssafy.authentication.service.AuthService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    @GetMapping("/kakao")
    fun getAccessToken(@RequestParam params: Map<String, String>): ResponseEntity<Map<String, Any>> {
        // parse code from payload
        val code = params["code"] as String
        return ResponseEntity(authService.publishAccessToken(code), HttpStatus.OK)
    }

}
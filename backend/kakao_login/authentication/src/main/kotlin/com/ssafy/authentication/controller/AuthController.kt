package com.ssafy.authentication.controller

import com.ssafy.authentication.service.AuthService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    @PostMapping("/kakao")
    fun getAccessToken(@RequestBody body: Map<String, String>): ResponseEntity<Map<String, Any>> {
        // parse code from payload
        val token = body["token"] as String
        return ResponseEntity(authService.publishAccessToken(token), HttpStatus.OK)
    }

    @GetMapping("/token")
    fun getAccessTokenForGoogle(@RequestParam userId: String): ResponseEntity<Map<String, Any>> =
        ResponseEntity(authService.publishAccessTokenForGoogle(userId), HttpStatus.OK)

    @GetMapping("/token/refresh")
    fun getAccessTokenUsingRefreshToken(
        @RequestHeader(name = "Authorization") accessToken: String,
        @RequestHeader(name = "Refresh-Token") refreshToken: String
    ): ResponseEntity<String> =
        ResponseEntity(authService.republishAccessToken(accessToken, refreshToken), HttpStatus.OK)


}
package com.ssafy.authentication.controller

import com.ssafy.authentication.service.AuthService
import com.ssafy.authentication.utils.JwtUtil
import org.slf4j.LoggerFactory
import org.springframework.http.*
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.postForEntity

@RestController
@CrossOrigin("*")
@RequestMapping("/api/auth")
class AuthController(private val authService: AuthService) {

    @GetMapping("/kakao/code")
    fun getAccessToken(@RequestParam params: Map<String, String>): ResponseEntity<Map<String, Any>> {
        // parse code from payload
        val code = params["code"] as String
        return ResponseEntity(authService.publishAccessToken(code), HttpStatus.OK)
    }

}
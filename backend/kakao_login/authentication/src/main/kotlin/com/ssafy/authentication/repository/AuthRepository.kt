package com.ssafy.authentication.repository

import com.ssafy.authentication.utils.JwtUtil
import org.slf4j.LoggerFactory
import org.springframework.http.*
import org.springframework.stereotype.Repository
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.getForEntity
import org.springframework.web.client.postForEntity
import java.util.*
import kotlin.collections.HashMap

@Repository
class AuthRepository(private val restTemplate: RestTemplate) {

    private val logger = LoggerFactory.getLogger(javaClass)

    private val USER_API_URL = "https://k6c105.p.ssafy.io:8083/api/user"

    fun getKakaoUserIdWithToken(accessToken: String?): Long {
        val headers = HttpHeaders()
        headers.contentType = MediaType.APPLICATION_FORM_URLENCODED
        headers["Authorization"] = "Bearer $accessToken"

        val body = LinkedMultiValueMap<String, Any>()
        val request = HttpEntity(body, headers)
        val response: ResponseEntity<Map<String, Any>> =
            restTemplate.postForEntity("https://kapi.kakao.com/v2/user/me", request)

        return response.body?.get("id") as Long
    }


    fun checkUserAndGetRefreshToken(userId: String, token: String, type: String = "USER"): String {
        val headers = HttpHeaders()
        val body = HashMap<String, Any>()
        val request = HttpEntity(body, headers)
        val response: ResponseEntity<Boolean> = restTemplate.getForEntity("$USER_API_URL/$userId", request)
        // if response is not null and true, get refresh token
        if (response.body == true) {
            logger.debug("this user id registered")
            val refreshTokenResponse: ResponseEntity<String> =
                restTemplate.getForEntity("$USER_API_URL/refresh-token/$userId", request)

            return refreshTokenResponse.body ?: throw RuntimeException("there are no user with this user id: $userId")
        }
        // else generate new user with refresh token
        logger.debug("this user is not registered, trying create new user")
        headers["Authorization"] = token
        headers.contentType = MediaType.APPLICATION_JSON
        val refreshToken = JwtUtil.createJwtRefreshToken()
        body["nickname"] = "random nickname created at ${Date().time}"
        body["token"] = refreshToken
        body["type"] = type
        val userCreateRequest = HttpEntity(body, headers)
        val userCreateResponse: ResponseEntity<Map<String, Any>> =
            restTemplate.postForEntity("$USER_API_URL", userCreateRequest)
        if (userCreateResponse.statusCode == HttpStatus.OK) return refreshToken

        throw RuntimeException("failed to create new user")
    }

    fun validateRefreshToken(refreshToken: String): Boolean {
        val headers = HttpHeaders()
        val body = HashMap<String, Any>()
        val request = HttpEntity(body, headers)
        val response: ResponseEntity<Boolean> =
            restTemplate.getForEntity("$USER_API_URL/refresh-token?token=$refreshToken", request)
        response.body?.let {
            return it
        }
        throw RuntimeException("there are no such refresh token")
    }
}
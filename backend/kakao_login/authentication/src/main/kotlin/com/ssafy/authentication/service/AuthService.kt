package com.ssafy.authentication.service

import com.ssafy.authentication.utils.JwtUtil
import org.slf4j.LoggerFactory
import org.springframework.http.*
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.postForEntity

@Service
class AuthService(private val restTemplate: RestTemplate) {

    private val logger = LoggerFactory.getLogger(javaClass)

    fun publishAccessToken(code: String) : Map<String, Any> {
        logger.debug("Kakao Code : $code")

        // get access token with code
        val kakaoAccessToken = getKakaoAccessTokenWithCode(code)
        logger.debug("Kakao Access Token : $kakaoAccessToken")

        // get user info with access token
        val kakaoUserId = getKakaoUserIdWithToken(kakaoAccessToken)
        logger.debug("Kakao ID Value : $kakaoUserId")

        // check if id exists in DB, if it does return data else create new user info and put it to db

        // create jwt token with user info and response to client
        val jwtAccessToken =
            JwtUtil.createJwtAccessToken(kakaoUserId) // token includes user info
        val jwtRefreshToken = JwtUtil.createJwtRefreshToken()

        // put tokens to result map
        val result: MutableMap<String, Any> = HashMap()
        result["access_token"] = jwtAccessToken
        result["refresh_token"] = jwtRefreshToken

        return result
    }

    private fun getKakaoAccessTokenWithCode(code: String?): String {
        val header: HttpHeaders = HttpHeaders()
        header.contentType = MediaType.APPLICATION_FORM_URLENCODED

        val body = LinkedMultiValueMap<String, String>()
        body["grant_type"] = "authorization_code"
        body["client_id"] = "80161aeec9b53c1dd5c367be40966be2" // kakao api key
        body["redirect_uri"] = "http://www.localhost:5500/oauth.html" // redirect url
        body["code"] = code

        val request = HttpEntity<MultiValueMap<String, String>>(body, header)
        val response: ResponseEntity<Map<String, Any>> =
            restTemplate.postForEntity("https://kauth.kakao.com/oauth/token", request)

        return response.body?.get("access_token") as String
    }

    private fun getKakaoUserIdWithToken(accessToken: String?): Long {
        val header = HttpHeaders()
        header.contentType = MediaType.APPLICATION_FORM_URLENCODED
        header["Authorization"] = "Bearer $accessToken"

        val body = LinkedMultiValueMap<String, Any>()
        val request = HttpEntity(body, header)
        val response: ResponseEntity<Map<String, Any>> =
            restTemplate.postForEntity("https://kapi.kakao.com/v2/user/me", request)

        return response.body?.get("id") as Long
    }
}
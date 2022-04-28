package com.ssafy.authentication.repository

import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Repository
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.postForEntity

@Repository
class AuthRepository(private val restTemplate: RestTemplate) {

    private val GATEWAY_URL_PREFIX = "http://localhost:8080/api"

    fun getKakaoAccessTokenWithCode(code: String?): String {
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

    fun getKakaoUserIdWithToken(accessToken: String?): Long {
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
package com.ssafy.authentication.controller

import com.ssafy.authentication.util.JwtTokenManager
import jdk.nashorn.internal.runtime.logging.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.*
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate
import org.springframework.web.client.exchange
import org.springframework.web.client.getForObject
import org.springframework.web.client.postForEntity
import org.springframework.web.util.UriComponents
import org.springframework.web.util.UriComponentsBuilder

@RestController
@CrossOrigin("*")
@RequestMapping("/auth")
class AuthController(private val restTemplate: RestTemplate, private val jwtTokenManager: JwtTokenManager) {

    private val logger = LoggerFactory.getLogger(javaClass)

    @GetMapping("/kakao/code")
    fun getAccessToken(@RequestParam params: Map<String, String>): ResponseEntity<Map<String, Any>> {
        val code = params["code"]
        logger.debug("Kakao Code : $code")

        // get access token with code
        var header: HttpHeaders = HttpHeaders()
        header.contentType = MediaType.APPLICATION_FORM_URLENCODED
        var body = LinkedMultiValueMap<String, Any>()
        body["grant_type"] = "authorization_code"
        body["client_id"] = "80161aeec9b53c1dd5c367be40966be2"
        body["redirect_uri"] = "http://www.localhost:5500/oauth.html"
        body["code"] = code
        var request = HttpEntity<MultiValueMap<String, Any>>(body, header)
        val response: ResponseEntity<Map<String, Any>> =
            restTemplate.postForEntity("https://kauth.kakao.com/oauth/token", request)
        val accessToken = response.body?.get("access_token")
        //println("access token is $accessToken")
        logger.debug("Kakao Access Token : $accessToken")
        // get user info with access token
        header = HttpHeaders()
        header.contentType = MediaType.APPLICATION_FORM_URLENCODED
        header["Authorization"] = "${response.body?.get("token_type")} $accessToken"
        body = LinkedMultiValueMap()
        request = HttpEntity(body, header)
        val info: ResponseEntity<Map<String, Any>> =
            restTemplate.postForEntity("https://kapi.kakao.com/v2/user/me", request)
        //println("user id is ${info.body?.get("id")}")
        logger.debug("User ID : ${info.body?.get("id")}")
        //check if id exists in DB, if it does return data else create new user info and put it to db

        //create jwt token with user info and response to client
        val jwtAccessToken =
            jwtTokenManager.createAccessToken(info.body?.get("id").toString()) // token includes user info
        val jwtRefreshToken = jwtTokenManager.createRefreshToken()
        println("Token from Server : $jwtAccessToken")
        val result: MutableMap<String, Any> = HashMap()
        result["access_token"] = jwtAccessToken
        result["refresh_token"] = jwtRefreshToken

        return ResponseEntity(result, HttpStatus.OK)
    }

}
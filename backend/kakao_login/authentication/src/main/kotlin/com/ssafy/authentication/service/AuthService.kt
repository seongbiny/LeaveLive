package com.ssafy.authentication.service

import com.ssafy.authentication.repository.AuthRepository
import com.ssafy.authentication.utils.JwtUtil
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class AuthService(private val authRepository: AuthRepository) {

    private val logger = LoggerFactory.getLogger(javaClass)

    fun publishAccessToken(code: String) : Map<String, Any> {
        logger.debug("Kakao Code : $code")

        // get access token with code
        val kakaoAccessToken = authRepository.getKakaoAccessTokenWithCode(code)
        logger.debug("Kakao Access Token : $kakaoAccessToken")

        // get user info with access token
        val kakaoUserId = authRepository.getKakaoUserIdWithToken(kakaoAccessToken)
        logger.debug("Kakao ID Value : $kakaoUserId")
        // create hashed id with salt to prevent overwriting google id : SALT = KAKAO
        val hashedId = "${kakaoUserId}KAKAO"

        // create jwt token with hashed userid
        val jwtAccessToken =
            JwtUtil.createJwtAccessToken(hashedId) // token includes userid

        // check if id exists in DB, if it doesn't create new user
        authRepository.checkUser(hashedId, jwtAccessToken)

        // if user is already exists, use it's existing refresh token else create new one
        val jwtRefreshToken = JwtUtil.createJwtRefreshToken()



        // put tokens to result map
        val result: MutableMap<String, Any> = HashMap()
        result["access_token"] = jwtAccessToken
        result["refresh_token"] = jwtRefreshToken

        return result
    }

}
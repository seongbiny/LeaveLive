package com.ssafy.leavelive.gateway.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.auth0.jwt.exceptions.TokenExpiredException
import com.ssafy.leavelive.gateway.model.TokenStatus
import java.util.*

class JwtUtil {

    companion object {
        private const val EXPIRE_DATE: Long = 1000 * 60 * 30
        private const val SECRET_KEY: String = "blahblahblahblahblahblahblahblahblah"

        fun createJwtAccessToken(thirdPartyId: Long): String {
            return JWT.create()
                .withExpiresAt(Date(System.currentTimeMillis() + EXPIRE_DATE))
                .withClaim("id", thirdPartyId)
                .sign(Algorithm.HMAC512(SECRET_KEY))
        }

        fun createJwtRefreshToken(): String {
            return JWT.create()
                .withClaim("id", UUID.randomUUID().toString())
                .sign(Algorithm.HMAC512(SECRET_KEY))
        }

        fun isValid(token: String?): Boolean {
            return try {
                val decodedToken = JWT.require(Algorithm.HMAC512(SECRET_KEY))
                    .build()
                    .verify(token)
                true
            } catch (e: Exception) {
                false
            }
        }

        fun validateToken(token: String?) : TokenStatus {
            // input token is "Bearer alsdkjaslkdjksladjklasjdklasjdlkasjdl" so substring it from index 7
            return try {
                JWT.require(Algorithm.HMAC512(SECRET_KEY))
                    .build()
                    .verify(token)
                TokenStatus.VALID
            } catch (e: TokenExpiredException) {
                TokenStatus.EXPIRED
            } catch (e: Exception) {
                TokenStatus.INVALID
            }
        }
    }
}
package com.ssafy.authentication.utils

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.util.*

class JwtUtil {

    companion object {
        private const val EXPIRE_DATE: Long = 1000 * 60 * 1 // 1min

        private const val SECRET_KEY: String = "blahblahblahblahblahblahblahblahblah"

        fun createJwtAccessToken(hashedId: String): String {
            return JWT.create()
                .withExpiresAt(Date(System.currentTimeMillis() + EXPIRE_DATE))
                .withClaim("id", hashedId)
                .sign(Algorithm.HMAC512(SECRET_KEY))
        }

        fun createJwtRefreshToken(): String {
            return JWT.create()
                .withClaim("id", UUID.randomUUID().toString())
                .sign(Algorithm.HMAC512(SECRET_KEY))
        }

        fun decodeToken(token: String): String = JWT.decode(token).claims["id"]!!.asString()

    }
}
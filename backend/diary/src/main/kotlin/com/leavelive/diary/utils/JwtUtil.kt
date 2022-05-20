package com.leavelive.diary.utils

import com.auth0.jwt.JWT

class JwtUtil {
    companion object {
        fun decodeToken(token: String): String = JWT.decode(token).claims["id"]!!.asString()
    }
}
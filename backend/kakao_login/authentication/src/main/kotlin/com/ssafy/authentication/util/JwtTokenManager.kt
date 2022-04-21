package com.ssafy.authentication.util

import com.sun.org.apache.xpath.internal.operations.Bool
import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import io.jsonwebtoken.security.SignatureException
import org.springframework.stereotype.Component
import java.nio.charset.StandardCharsets
import java.util.*

@Component
class JwtTokenManager {
    private val SECRET_KEY = Keys.hmacShaKeyFor("secretsfkljasdlkjsdflkjalksdjlkadsfjlkajsdlksa".toByteArray(StandardCharsets.UTF_8))

    private val VALID_TIME = 30 * 60 * 1000L // 30Min

    // create Jwt Access Token : Includes User ID Only
    fun createAccessToken(userId: String): String {
        val now = Date()
        return Jwts.builder()
            .setHeaderParam("typ", "JWT")
            .setIssuedAt(now)
            .claim("userId", userId)
            .setExpiration(Date(now.time + VALID_TIME))
            .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
            .compact()
    }

    // create Jwt Refresh Token : create with UUID and Date
    fun createRefreshToken(): String {
        return Jwts.builder()
            .setHeaderParam("typ", "JWT")
            .setIssuedAt(Date())
            .signWith(
                Keys.hmacShaKeyFor(UUID.randomUUID().toString().toByteArray(StandardCharsets.UTF_8)),
                SignatureAlgorithm.HS256
            )
            .compact()
    }

    // validate token
    fun validateToken(token : String) : Boolean {
        return try {
            val decodedToken = Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token)
            val result = decodedToken.body.expiration.time >= Date().time
            println(result)
            result
        } catch (e : ExpiredJwtException) {
            println("Token Expired")
            false
        } catch (e : SignatureException) {
            println("Signature Exception")
            false
        }
    }
}
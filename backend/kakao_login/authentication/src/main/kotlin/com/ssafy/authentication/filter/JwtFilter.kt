package com.ssafy.authentication.filter

import com.ssafy.authentication.util.JwtTokenManager
import org.springframework.http.HttpStatus
import org.springframework.web.filter.GenericFilterBean
import org.springframework.web.filter.OncePerRequestFilter
import java.io.IOException
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JwtFilter(private val jwtTokenManager: JwtTokenManager) : OncePerRequestFilter() {

    //    @Throws(IOException::class, ServletException::class)
//    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {
//
//        val httpRequest = request as HttpServletRequest
//        val token = httpRequest.getHeader("Authorization")
//        if (token != null && jwtTokenManager.validateToken(token)) {
//            // if token is valid, pass through filter
//            chain.doFilter(request, response)
//        } else {
//            response.writer.println("you have no permission")
//
//            return
//
//        }
//    }
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val token = request.getHeader("Authorization")
        println("Token : $token")
        if (token == null || !jwtTokenManager.validateToken(token)) {
            response.status = 403
            return
        }
        filterChain.doFilter(request, response)
    }

}
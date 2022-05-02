package com.ssafy.leavelive.gateway.filter

import com.ssafy.leavelive.gateway.model.TokenStatus
import com.ssafy.leavelive.gateway.utils.JwtUtil
import org.springframework.cloud.gateway.filter.GatewayFilter
import org.springframework.cloud.gateway.filter.GatewayFilterChain
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.server.ServerWebExchange
import reactor.core.publisher.Mono

@Component
class AuthenticationFilter : GatewayFilter {
    override fun filter(exchange: ServerWebExchange, chain: GatewayFilterChain): Mono<Void> {
        val request = exchange.request
        val response = exchange.response

        if (!JwtUtil.isValid(request.headers["Authorization"]?.get(0))) {
            response.statusCode = HttpStatus.UNAUTHORIZED
            return response.setComplete()
        }

        when(JwtUtil.validateToken(request.headers["Authorization"]?.get(0))) {
            TokenStatus.VALID -> {
                return chain.filter(exchange)
            }
            TokenStatus.EXPIRED -> {
                // check refresh token
                
            }
            TokenStatus.INVALID -> {
                response.statusCode = HttpStatus.UNAUTHORIZED
                return response.setComplete()
            }
        }

        return chain.filter(exchange)
    }
}
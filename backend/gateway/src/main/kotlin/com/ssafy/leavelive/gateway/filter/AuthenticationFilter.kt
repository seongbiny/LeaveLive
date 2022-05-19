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
        val accessToken = request.headers["Authorization"]
        // if access token is not null
        accessToken?.let {
            return when (JwtUtil.validateToken(it[0])) {
                TokenStatus.VALID -> {
                    chain.filter(exchange)
                }
                TokenStatus.EXPIRED -> {
                    // when client got response with forbidden code, client must republish access token with refresh token at header
                    response.statusCode = HttpStatus.FORBIDDEN
                    response.setComplete()
                }
                TokenStatus.INVALID -> {
                    response.statusCode = HttpStatus.UNAUTHORIZED
                    response.setComplete()
                }
            }
        }
        // else if access token is null
        response.statusCode = HttpStatus.UNAUTHORIZED
        return response.setComplete()

    }
}
package com.ssafy.leavelive.gateway.config

import com.ssafy.leavelive.gateway.filter.AuthenticationFilter
import org.springframework.cloud.gateway.route.RouteLocator
import org.springframework.cloud.gateway.route.builder.GatewayFilterSpec
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

private const val URL = "localhost"

@Configuration
class RouteConfig(private val authenticationFilter: AuthenticationFilter) {

    @Bean
    fun routeLeaveLiveGatewayConfig(builder: RouteLocatorBuilder): RouteLocator {
        return builder
            .routes()
            .route("kakao_auth_route") {
                it
                    .path("/api/auth/kakao/**")
                    .uri("http://$URL:8081")
            }
            .route("google_auth_route") {
                it
                    .path("/api/auth/google/**")
                    .uri("http://$URL:8082")
            }
            .route("token_republish_route") {
                it.path("/api/auth/token/**")
                    .uri("http://$URL:8081")
            }
            .route("user_route") {
                it
                    .path("/api/user/**")
                    .filters { f: GatewayFilterSpec -> f.filter(authenticationFilter) }
                    .uri("http://$URL:8083")
            }
            .route("accommodation_route") {
                it
                    .path("/api/accommodation/**")
                    .filters { f: GatewayFilterSpec -> f.filter(authenticationFilter) }
                    .uri("http://$URL:8084")

            }
            .route("accommodation_exclude_auth") {
                it
                    .order(-1)
                    .path("/api/accommodation/all/**", "/api/accommodation/detail/**")
                    .uri("http://$URL:8084")
            }
            .route("activity_route") {
                it
                    .path("/api/activity/**")
                    .filters { f: GatewayFilterSpec -> f.filter(authenticationFilter) }
                    .uri("http://$URL:8085")
            }
            .route("activity_exclude_path") {
                it
                    .order(-1)
                    .path("/api/activity/all/**", "/api/activity/detail/**")
                    .uri("http://$URL:8085")
            }
            .route("diary_route") {
                it
                    .path("/api/diary/**")
                    .filters { f: GatewayFilterSpec -> f.filter(authenticationFilter) }
                    .uri("http://$URL:8086")
            }

            .build()
    }

}

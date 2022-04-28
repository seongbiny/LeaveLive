package com.ssafy.leavelive.gateway.config

import com.ssafy.leavelive.gateway.filter.AuthenticationFilter
import org.springframework.cloud.gateway.route.RouteLocator
import org.springframework.cloud.gateway.route.builder.GatewayFilterSpec
import org.springframework.cloud.gateway.route.builder.PredicateSpec
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RouteConfig(private val authenticationFilter: AuthenticationFilter) {

    @Bean
    fun routeLeaveLiveGatewayConfig(builder: RouteLocatorBuilder): RouteLocator {
        return builder
            .routes()
            .route("kakao_auth_route") { p: PredicateSpec ->
                p
                    .path("/api/auth/kakao/**")
                    .uri("http://localhost:8081")
            }
            .route("google_auth_route") { p: PredicateSpec ->
                p
                    .path("/api/auth/google/**")
                    .uri("http://localhost:8082")

            }
            .route("user_route") { p: PredicateSpec ->
                p
                    .path("/api/user/**")
                    .filters { f: GatewayFilterSpec -> f.filter(authenticationFilter) }
                    .uri("http://localhost:8083")
            }
            .route("accommodation_route") { p: PredicateSpec ->
                p
                    .path("/api/accommodation/**")
                    .filters { f: GatewayFilterSpec -> f.filter(authenticationFilter) }
                    .uri("http://localhost:8084")
            }.route("activity_route") { p: PredicateSpec ->
                p
                    .path("/api/activity/**")
                    .filters { f: GatewayFilterSpec -> f.filter(authenticationFilter) }
                    .uri("http://localhost:8085")
            }.route("diary_route") { p: PredicateSpec ->
                p
                    .path("/api/diary/**")
                    .filters { f: GatewayFilterSpec -> f.filter(authenticationFilter) }
                    .uri("http://localhost:8086")
            }
            .route("filter_test") { p: PredicateSpec ->
                p
                    .path("/api/test/**")
                    .filters { f: GatewayFilterSpec -> f.filter(authenticationFilter) }
                    .uri("http://localhost:8081")
            }
            .build()
    }

}
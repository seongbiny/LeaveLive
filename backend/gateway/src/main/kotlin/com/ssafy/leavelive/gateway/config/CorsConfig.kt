package com.ssafy.leavelive.gateway.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.reactive.CorsConfigurationSource
import org.springframework.web.cors.reactive.CorsWebFilter
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource

@Configuration
class CorsConfig {

    @Bean
    fun corsConfigurationSource() : CorsConfigurationSource {
        val source : UrlBasedCorsConfigurationSource = UrlBasedCorsConfigurationSource()
        val corsConfiguration : CorsConfiguration = CorsConfiguration()
        corsConfiguration.addAllowedHeader("*")
        corsConfiguration.addAllowedOriginPattern("*")
        corsConfiguration.addAllowedMethod("*")
        corsConfiguration.allowCredentials = true
        source.registerCorsConfiguration("/**", corsConfiguration)
        return source
    }

    @Bean
    fun corsWebFilter() : CorsWebFilter {
        return CorsWebFilter(corsConfigurationSource())
    }
}
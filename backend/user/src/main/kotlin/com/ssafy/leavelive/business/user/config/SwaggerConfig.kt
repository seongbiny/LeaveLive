package com.ssafy.leavelive.business.user.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springdoc.core.GroupedOpenApi
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwaggerConfig {

    @Bean
    fun publicApi(): GroupedOpenApi =
        GroupedOpenApi.builder()
            .group("V1")
            .pathsToMatch("/api/user/**", "/api/user/image")
            .build()

    @Bean
    fun userOpenApi(): OpenAPI =
        OpenAPI()
            .info(Info()
                .title("Leave, Live User API")
                .description("리브리브 사용자 API")
                .version("V1"))
}
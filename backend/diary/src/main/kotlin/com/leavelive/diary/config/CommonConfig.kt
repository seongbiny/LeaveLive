package com.leavelive.diary.config

import org.modelmapper.Conditions
import org.modelmapper.ModelMapper
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

@Configuration
class CommonConfig {

    @Bean
    fun restTemplate() : RestTemplate = RestTemplateBuilder().build()

    // reason to prevent modelmapper : hard to catch error at compile time
    @Bean
    fun modelMapper() : ModelMapper {
        val modelMapper = ModelMapper()
        modelMapper.configuration.isFieldMatchingEnabled = true
        modelMapper.configuration.propertyCondition = Conditions.isNotNull()
        modelMapper.configuration.fieldAccessLevel = org.modelmapper.config.Configuration.AccessLevel.PRIVATE
        return modelMapper
    }
}
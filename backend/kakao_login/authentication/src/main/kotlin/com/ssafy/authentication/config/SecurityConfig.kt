package com.ssafy.authentication.config

import com.ssafy.authentication.filter.JwtFilter
import com.ssafy.authentication.util.JwtTokenManager
import org.springframework.context.annotation.Bean
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@EnableWebSecurity
class SecurityConfig(private val jwtTokenManager: JwtTokenManager) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
        //super.configure(http)
        http.httpBasic().disable().csrf().disable().cors()
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/api/**").permitAll()
            .and()
            .addFilterBefore(JwtFilter(jwtTokenManager), UsernamePasswordAuthenticationFilter::class.java)

    }

    override fun configure(web: WebSecurity) {
        web.ignoring().antMatchers("/auth/**")
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val config = CorsConfiguration()
        config.allowedOrigins = listOf("*")
        config.addAllowedHeader("*")
        config.addAllowedMethod("*")
        //config.allowCredentials = true

        val src = UrlBasedCorsConfigurationSource()
        src.registerCorsConfiguration("/**", config)
        return src
    }

    @Bean
    override fun authenticationManager(): AuthenticationManager {
        return super.authenticationManager()
    }
}
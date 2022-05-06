package leavelive.accommodation.config;

import leavelive.accommodation.config.jwt.JwtAuthorizationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true,prePostEnabled = true) //secured 어노테이션 활성화, controller에서 @Secured 사용 가능 / preRole 어노테이션 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CorsFilter corsFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션을 사용하지 않겠다.
                .and()
                .addFilter(corsFilter) //corsConfig에 등록된 필터를 거쳐감
                .formLogin().disable() //기본적인 http session 로그인 form X
                .addFilter(new JwtAuthorizationFilter(authenticationManager())) //AuthenticationManager 던져줘야함
                .httpBasic().disable() //Authorization에 token을 들고가겠다.
                .authorizeRequests()
                .anyRequest().permitAll();
    }
}

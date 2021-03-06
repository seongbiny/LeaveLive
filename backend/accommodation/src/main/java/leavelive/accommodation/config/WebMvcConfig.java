package leavelive.accommodation.config;

import leavelive.accommodation.interceptor.HttpInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HttpInterceptor())
                .addPathPatterns("/api/accommodation/**")
                .excludePathPatterns(new String[]{"/api/accommodation/all/**","/api/accommodation/detail/**"});
    }
}

package leavelive.activity.config.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("JwtAuthorizationFilter.doFilterInternal:실행..");
        String uri=request.getRequestURI();
        if(uri.equals("/api/test")){
            log.info("JwtAuthorizationFilter.doFilterInternal:필터 제외");
        }else{
            log.info("JwtAuthorizationFilter.doFilterInternal:필터 탐");
        }
        chain.doFilter(request,response);
    }
}

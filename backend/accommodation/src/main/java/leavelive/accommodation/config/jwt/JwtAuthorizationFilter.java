package leavelive.accommodation.config.jwt;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("JwtAuthorizationFilter 실행..");
        String uri=request.getRequestURI();
        if(uri.equals("/api/test")){
            System.out.println("제외");
        }else{
            System.out.println("필터 타야함");
        }
        chain.doFilter(request, response);
    }
}

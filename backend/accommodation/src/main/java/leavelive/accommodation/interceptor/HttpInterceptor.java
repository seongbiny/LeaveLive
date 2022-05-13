package leavelive.accommodation.interceptor;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import leavelive.accommodation.exception.LoginException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.Charset;

@Configuration
@Slf4j
public class HttpInterceptor implements HandlerInterceptor {
    private final String SECRET_KEY = "blahblahblahblahblahblahblahblahblah";

    /**
     * AccessToken를 해석해 userId를 뽑아내고, DB에 해당 user가 있는지 확인
     * @param request
     * @param response
     * @param handler
     * @return userId
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandler 실행--------");
        String userId="114760122369855290515GOOGLE";
        String token=request.getHeader("Authorization");
        try{
            DecodedJWT decodeToken = JWT.require(Algorithm.HMAC512(SECRET_KEY))
                    .build().verify(token);
            userId = decodeToken.getClaim("id").asString();
            log.info("interceptor id:"+userId);
        }catch(TokenExpiredException e){
            e.printStackTrace();
            log.error("HttpInterceptor.preHandle:error");
        }

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application","json", Charset.forName("UTF-8"))); //json으로 설정
        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);
        //requestMessage 만들기
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://k6c105.p.ssafy.io:8083/api/user/"+userId;
        try{
            //요청하기
            ResponseEntity<Boolean> responseEntity=restTemplate.getForEntity(url,Boolean.class,requestMessage);
            if(!responseEntity.getBody()) throw new LoginException("존재하지 않는 아이디입니다.");
            else {
                response.addHeader("userId",userId);
                log.info("HttpInterceptor.preHandle.response:존재하는 아이디입니다.");
            }
        }catch (Exception e){
            e.printStackTrace();
            log.error("HttpInterceptor.preHandle.response:error");
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}

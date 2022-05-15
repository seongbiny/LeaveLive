package com.security.jwt.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class JwtCreateController {
    private final String SECRET_KEY = "blahblahblahblahblahblahblahblahblah";

    /**
     * 토큰을 만들고, 만약 유저가 있다면 refresh토큰 발급, 없으면 회원가입키시고 refresh토큰 발급
     * 닉네임은 랜덤생성
     * @param data
     * @return
     */
    @PostMapping("/auth/google")
    public List<String> jwtCreate(@RequestParam("type") String type, @RequestBody Map<String, Object> data) {
        List<String> tokens = new ArrayList<>();
        log.info("type"+type);
        log.info("jwtCreateController 실행");
        log.info("JwtCreateController.jwtCreate.data:" + data.get("profileObj"));
        Map<String, Object> map = (Map<String, Object>) data.get("profileObj");

        // jwtToken 및 refreshToken 발급
        String userId = map.get("googleId") + "GOOGLE";
        String jwtToken = JWT.create()
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000)*20160)) //2주
                .withClaim("id", userId)
                .sign(Algorithm.HMAC512(SECRET_KEY));
        String refreshToken = JWT.create()
                .withClaim("id", UUID.randomUUID().toString())
                .sign(Algorithm.HMAC512(SECRET_KEY));
        String picPath = String.valueOf(map.get("imageUrl"));
        String nickname = randomNickName();

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application", "json", Charset.forName("UTF-8"))); //json으로 설정
        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);
        
        //user가 있는지 확인
        RestTemplate restTemplate = new RestTemplate();
        String baseUrl = "https://k6c105.p.ssafy.io:8083/api/user";
        String url = baseUrl + "/" + userId;
        try {
            ResponseEntity<Boolean> responseEntity = restTemplate.getForEntity(url, Boolean.class, requestMessage);
            log.info("JwtCreateController.jwtCreate.response_body:" + responseEntity.getBody());
            if (!responseEntity.getBody()) {
                url=baseUrl;
                httpHeaders.set("Authorization", jwtToken);
                Map<String, String> body = new HashMap<>();
                body.put("picPath", picPath);
                body.put("nickname", nickname);
                body.put("token", refreshToken);
                body.put("type",type);
                requestMessage = new HttpEntity<>(body, httpHeaders);
                ResponseEntity<Map> responseMap = restTemplate.postForEntity(url, requestMessage, Map.class);
                log.info("JwtCreateController.jwtCreate.response_body:" + responseEntity.getBody());
                if (responseMap.getStatusCode() != HttpStatus.OK) {
                    throw new RuntimeException("로그인이 되지 않습니다.");
                }
            } else {
                url = baseUrl + "/refresh-token/" + userId;
                ResponseEntity<String> refreshTokenResponse = restTemplate.getForEntity(url, String.class, requestMessage);
                if(refreshTokenResponse.getStatusCode()!=HttpStatus.OK){
                    throw new RuntimeException("로그인이 되지 않습니다.");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("JwtCreateController.jwtCreate.response:error");
        }
        tokens.add(jwtToken);
        tokens.add(refreshToken);
        return tokens;
    }

    public String randomNickName(){
        String[] adj={"적합한","행복한","무서운","푸하하","청결한","낭랑한","척척박사","옆집","앞집","똑똑한"};
        String[] name={"척척박사","싸피인","포식자","코뿔새","바다뱀","누","초록두꺼비","참돌고래","영원","토끼"};
        int first=(int)(Math.random()*10);
        int second=(int)(Math.random()*10);
        return adj[first]+" "+name[second];
    }
}

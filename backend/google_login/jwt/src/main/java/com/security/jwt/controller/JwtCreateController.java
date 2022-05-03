package com.security.jwt.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.security.jwt.domain.User;
import com.security.jwt.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import lombok.val;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequiredArgsConstructor
@Slf4j
public class JwtCreateController {
    private final String SECRET_KEY = "blahblahblahblahblahblahblahblahblah";

    @GetMapping("/auth/google")
    public List<String> jwtCreate(@RequestBody Map<String, Object> data) {
        List<String> tokens = new ArrayList<>();
        log.info("jwtCreateController 실행");
        log.info("JwtCreateController.jwtCreate.data:" + data.get("profileObj"));
        Map<String, Object> map = (Map<String, Object>) data.get("profileObj");
        // 토큰 만들기
        String userId = String.valueOf(map.get("googleId")) + "GOOGLE";
        String jwtToken = JWT.create()
                .withExpiresAt(new Date(System.currentTimeMillis() + (60000) * 1)) //1분
                .withClaim("id", userId)
                .sign(Algorithm.HMAC512(SECRET_KEY));
        String refreshToken = JWT.create()
//                .withExpiresAt(new Date(System.currentTimeMillis()+(60000)*20160)) //2주
                .withClaim("id", UUID.randomUUID().toString())
                .sign(Algorithm.HMAC512(SECRET_KEY));
        String picPath = String.valueOf(map.get("imageUrl"));
        String nickname = String.valueOf(map.get("name")) + LocalDateTime.now();

        // 유저 있는지 없는지 확인, 없으면 가입시키고 refreshToken 발급  // 있으면 걍 refreshToken 발급
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application", "json", Charset.forName("UTF-8"))); //json으로 설정
        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);
        //requestMessage 만들기
        RestTemplate restTemplate = new RestTemplate();
        String baseUrl = "http://localhost:8083/api/user";
        String url = baseUrl + "/" + userId;
        try {
            ResponseEntity<Boolean> responseEntity = restTemplate.getForEntity(url, Boolean.class, requestMessage);
            log.info("JwtCreateController.jwtCreate.response_body:" + responseEntity.getBody());
            if (!responseEntity.getBody()) {
                //존재하지 않음
                url=baseUrl;
                httpHeaders.set("Authorization", jwtToken);
                Map<String, String> body = new HashMap<>();
                body.put("picPath", picPath);
                body.put("nickname", nickname);
                body.put("token", refreshToken);
                requestMessage = new HttpEntity<>(body, httpHeaders);
                ResponseEntity<Map> responseMap = restTemplate.postForEntity(url, requestMessage, Map.class);
                log.info("JwtCreateController.jwtCreate.response_body:" + responseEntity.getBody());
                if (responseMap.getStatusCode() != HttpStatus.OK) {
                    throw new RuntimeException("로그인이 되지 않습니다.");
                }
            } else {
                // 존재
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
}

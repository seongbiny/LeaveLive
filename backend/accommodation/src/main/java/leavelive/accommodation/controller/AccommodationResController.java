package leavelive.accommodation.controller;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.domain.dto.AccommodationResDto;
import leavelive.accommodation.service.AccommodationResServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/accommodation/reservation")
@RequiredArgsConstructor
@Slf4j
public class AccommodationResController {
    private final AccommodationResServiceImpl service;

    @GetMapping("/")
    public ResponseEntity<List<AccommodationResDto>> getAllAccommodationFav(HttpServletResponse response) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        List<AccommodationResDto> list = service.findByUserId(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/{accommodation_id}")
    public ResponseEntity<Long> reservationAccommodation(HttpServletResponse response, @PathVariable("accommodation_id") Long id, @RequestBody AccommodationResDto request) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.reservationAccommodation.userId:" + userId);
        Long result = service.saveReservation(userId, id, request);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_res_id}")
    public ResponseEntity<Boolean> deleteAccommodationRes(HttpServletResponse response, @PathVariable("accommodation_res_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.deleteAccommodationRes.userId:" + userId);
        Boolean result = service.deleteReservation(userId, id);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}

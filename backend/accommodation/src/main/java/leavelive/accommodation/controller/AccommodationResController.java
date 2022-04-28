package leavelive.accommodation.controller;

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

import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accommodation/reservation")
@RequiredArgsConstructor
@Slf4j
public class AccommodationResController {
    private final AccommodationResServiceImpl service;

    @GetMapping("/")
    public ResponseEntity<List<AccommodationResDto>> getAllAccommodationFav(){
        String userId="1"; //임시로 준 유저아이디

//        // 유저가 DB에 있는지 확인 (현재는 숙소 목록 불러오기로 test한 코드임)
//        // 헤더 설정
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setContentType(new MediaType("application","json", Charset.forName("UTF-8"))); //json으로 설정
//        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);
//        //requestMessage 만들기
//        RestTemplate restTemplate = new RestTemplate();
//        String url = "http://localhost:8084/api/accommodation/all/dd";
//        try{
//            //요청하기
//            ResponseEntity<String> responseEntity=restTemplate.getForEntity(url,String.class,requestMessage);
//            log.info("AccommodationResController.getAllAccommodationFav.response:"+responseEntity);
//            log.info("AccommodationResController.getAllAccommodationFav.response_body:"+responseEntity.getBody());
//            if(!responseEntity.getBody().equals("ok")) throw new NullPointerException("존재하지 않는 아이디입니다.");
//        }catch (Exception e){
//            e.printStackTrace();
//            log.error("AccommodationResController.getAllAccommodationFav.response:error");
//        }

        List<AccommodationResDto> list=service.findByUserId(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/{accommodation_id}")
    public ResponseEntity<Long> reservationAccommodation(@PathVariable("accommodation_id") Long id, @RequestBody AccommodationResDto request){
        String userId="1"; //임시로 준 유저아이디
        Long result=service.saveReservation(userId,id,request);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_res_id}")
    public ResponseEntity<Long> deleteAccommodationRes(@PathVariable("accommodation_res_id") Long id){
        String userId="1"; //임시로 준 유저아이디
        String result=service.deleteReservation(userId,id);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}

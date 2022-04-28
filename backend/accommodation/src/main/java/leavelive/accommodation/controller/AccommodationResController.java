package leavelive.accommodation.controller;

import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.domain.dto.AccommodationResDto;
import leavelive.accommodation.service.AccommodationResServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/acommodation/reservation")
@RequiredArgsConstructor
public class AccommodationResController {
    private final AccommodationResServiceImpl service;

    @GetMapping("/")
    public ResponseEntity<List<AccommodationResDto>> getAllAccommodationFav(){
        String userId="1"; //임시로 준 유저아이디
        List<AccommodationResDto> list=service.findByUserId(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/{accommodation_id}")
    public ResponseEntity<Long> reservationAccommodation(@PathVariable("accommodation_id") Long id, @RequestBody AccommodationResDto request){
        String userId="1"; //임시로 준 유저아이디
        Long result=service.saveReservation(userId,id,request);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}

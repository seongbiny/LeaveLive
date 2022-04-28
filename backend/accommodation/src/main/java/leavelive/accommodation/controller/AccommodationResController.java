package leavelive.accommodation.controller;

import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.domain.dto.AccommodationResDto;
import leavelive.accommodation.service.AccommodationResServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/reservation")
@RequiredArgsConstructor
public class AccommodationResController {
    private final AccommodationResServiceImpl service;

    @GetMapping("/")
    public ResponseEntity<List<AccommodationResDto>> getAllAccommodationFav(){
        String userId="1"; //임시로 준 유저아이디
        List<AccommodationResDto> list=service.findByUserId(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }
}

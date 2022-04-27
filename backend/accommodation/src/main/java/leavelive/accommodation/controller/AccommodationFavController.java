package leavelive.accommodation.controller;

import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.service.AccommodationFavServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorite")
@RequiredArgsConstructor
public class AccommodationFavController {
    private final AccommodationFavServiceImpl service;

    @GetMapping("/")
    public ResponseEntity<List<AccommodationFavDto>> getAllAccommodationFav(){
        String userId="1"; //임시로 준 유저아이디
        List<AccommodationFavDto> list=service.getAllByUserId(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/{accommodation_id}")
    public ResponseEntity<AccommodationFavDto> saveAccommodationFav(@PathVariable("accommodation_id") Long id){
        String userId="1"; //임시로 준 유저아이디
        AccommodationFavDto dto=service.save(id,userId);
        return new ResponseEntity<>(dto,HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_fav_id}")
    public ResponseEntity<Long> deleteAccommodationFav(@PathVariable("accommodation_fav_id") Long id){
        String userId="1"; //임시로 준 유저아이디
        service.delete(id,userId);
        return new ResponseEntity<>(id,HttpStatus.OK);
    }

}

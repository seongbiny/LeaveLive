package leavelive.accommodation.controller;

import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import leavelive.accommodation.service.AccommodationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/accommodation")
@RequiredArgsConstructor
public class AccommodationController {
    private final AccommodationService service;

    @GetMapping("/")
    public ResponseEntity<List<AccommodationArticleDto>> getAllAccommodation(){
        List<AccommodationArticleDto> list=service.getAllAccommodation();
        ResponseEntity<List<AccommodationArticleDto>> res=new ResponseEntity(list, HttpStatus.OK);
        return res;
    }
}

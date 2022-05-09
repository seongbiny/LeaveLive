package leavelive.accommodation.controller;

import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import leavelive.accommodation.service.AccommodationServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/accommodation")
@Slf4j
public class AccommodationController {
    private final AccommodationServiceImpl service;

    @GetMapping("/all")
    public ResponseEntity<List<AccommodationArticleDto>> getAllAccommodation(@RequestParam("accommodation_loc") String loc){
        List<AccommodationArticleDto> list=service.getAllAccommodationByLoc(loc);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{accommodation_id}")
    public ResponseEntity<AccommodationArticleDto> getAccommodation(@PathVariable("accommodation_id") Long id){
        AccommodationArticleDto dto=service.getAccommodation(id);
        return new ResponseEntity(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_id}")
    public ResponseEntity<Boolean> deleteAccommodation(HttpServletResponse response, @PathVariable("accommodation_id") Long id){
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        Boolean result=service.delete(id,userId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(value = "/")
    public ResponseEntity<Long> saveAccomodation(HttpServletResponse response, @RequestPart(value="dto") AccommodationArticleDto request, @RequestPart(value="image", required=false) List<MultipartFile> files){
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        Long result=service.save(request,userId,files);
        return new ResponseEntity(result,HttpStatus.OK);
    }

    @PatchMapping("/{accommodation_id}")
    public ResponseEntity<AccommodationArticleDto> updateAccommodation(HttpServletResponse response, @PathVariable("accommodation_id") Long id, @RequestPart(value="request") AccommodationArticleDto request, @RequestPart(value="image", required=false) List<MultipartFile> files){
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        AccommodationArticleDto dto=service.update(request,id,userId,files);
        return new ResponseEntity(dto,HttpStatus.OK);
    }
}

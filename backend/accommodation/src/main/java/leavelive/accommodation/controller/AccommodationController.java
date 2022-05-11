package leavelive.accommodation.controller;

import leavelive.accommodation.domain.dto.AccommodationDto;
import leavelive.accommodation.service.AccommodationServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/accommodation")
@Slf4j
public class AccommodationController {
    private final AccommodationServiceImpl service;

    @GetMapping("/all")
    public ResponseEntity<List<AccommodationDto>> getAllAccommodation(@RequestParam("accommodation_loc") String loc){
        List<AccommodationDto> list=service.getAllAccommodationByLoc(loc);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{accommodation_id}")
    public ResponseEntity<AccommodationDto> getAccommodation(@PathVariable("accommodation_id") Long id){
        AccommodationDto dto=service.getAccommodation(id);
        return new ResponseEntity(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_id}")
    public ResponseEntity<Boolean> deleteAccommodation(HttpServletResponse response, @PathVariable("accommodation_id") Long id){
        String userId = response.getHeader("userId");
        log.info("AccommodationController.deleteAccommodation.userId:" + userId);
        Boolean result=service.delete(id,userId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(value = "/")
    public ResponseEntity<AccommodationDto> saveAccomodation(HttpServletResponse response, @RequestPart(value="dto") AccommodationDto request, @RequestPart(value="image", required=false) List<MultipartFile> files){
        String userId = response.getHeader("userId");
        log.info("AccommodationController.saveAccomodation.userId:" + userId);
        AccommodationDto result=service.save(request,userId,files);
        return new ResponseEntity(result,HttpStatus.OK);
    }

    @PatchMapping("/{accommodation_id}")
    public ResponseEntity<AccommodationDto> updateAccommodation(HttpServletResponse response, @PathVariable("accommodation_id") Long id, @RequestPart(value="request") AccommodationDto request, @RequestPart(value="image", required=false) List<MultipartFile> files){
        String userId = response.getHeader("userId");
        log.info("AccommodationController.updateAccommodation.userId:" + userId);
        AccommodationDto dto=service.update(request,id,userId,files);
        return new ResponseEntity(dto,HttpStatus.OK);
    }
    @GetMapping("/my")
    public ResponseEntity<List<AccommodationDto>> getAllMyAcc(HttpServletResponse response){
        String userId = response.getHeader("userId");
        log.info("AccommodationController.getAllCeoAccommodation.userId:" + userId);
        List<AccommodationDto> result=service.getAllMyAccommodation(userId);
        return new ResponseEntity(result,HttpStatus.OK);
    }
}

package leavelive.accommodation.controller;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import leavelive.accommodation.service.AccommodationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api/accommodation")
@RequiredArgsConstructor
@Slf4j
public class AccommodationController {
    private final AccommodationService service;

    @GetMapping("/all/{accommodation_loc}")
    public ResponseEntity<List<AccommodationArticleDto>> getAllAccommodation(@PathVariable("accommodation_loc") String loc){
        List<AccommodationArticleDto> list=service.getAllAccommodationByLoc(loc);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{accommodation_id}")
    public ResponseEntity<AccommodationArticleDto> getAccommodation(@PathVariable("accommodation_id") Long id){
        AccommodationArticleDto dto=service.getAccommodation(id);
        return new ResponseEntity(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_id}")
    public ResponseEntity<Long> deleteAccommodation(HttpServletResponse response, @PathVariable("accommodation_id") Long id){
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        Long result=service.delete(id,userId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(value = "/")
    public ResponseEntity<AccommodationArticleDto> saveAccomodation(HttpServletResponse response, @RequestPart(value="dto") AccommodationArticleDto request, @RequestPart(value="image", required=false) List<MultipartFile> files){
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        AccommodationArticleDto dto=service.save(request,userId,files);
        return new ResponseEntity(dto,HttpStatus.OK);
    }

    @PatchMapping("/{accommodation_id}")
    public ResponseEntity<AccommodationArticleDto> updateAccommodation(HttpServletResponse response, @PathVariable("accommodation_id") Long id, @RequestBody AccommodationArticleDto request){
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        AccommodationArticleDto dto=service.update(request,id,userId);
        return new ResponseEntity(dto,HttpStatus.OK);
    }

    @GetMapping(value = "/images")
    public ResponseEntity<byte[]> getImage(@RequestParam("image_path") String imagePath) throws IOException {
        log.info("AccommodationController.getImage.imagePath:"+imagePath);
        byte[] imageByteArray = service.findImage(imagePath);
        return new ResponseEntity(imageByteArray, HttpStatus.OK);
    }
}

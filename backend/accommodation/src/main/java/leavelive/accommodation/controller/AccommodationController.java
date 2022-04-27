package leavelive.accommodation.controller;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import leavelive.accommodation.service.AccommodationService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;

@RestController
@RequestMapping("/api/accommodation")
@RequiredArgsConstructor
public class AccommodationController {
    private final AccommodationService service;

    @GetMapping("/")
    public ResponseEntity<List<AccommodationArticleDto>> getAllAccommodation(){
        List<AccommodationArticleDto> list=service.getAllAccommodation();
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/{accommodation_id}")
    public ResponseEntity<AccommodationArticleDto> getAccommodation(@PathVariable("accommodation_id") Long id){
        AccommodationArticleDto dto=service.getAccommodation(id);
        return new ResponseEntity(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_id}")
    public ResponseEntity<Long> deleteAccommodation(@PathVariable("accommodation_id") Long id){
        String userId="1"; // 임시로 부여한 userId
        Long result=service.delete(id,userId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping(value = "/")
    public ResponseEntity<AccommodationArticleDto> saveAccomodation(@RequestPart(value="dto") AccommodationArticleDto request, @RequestPart(value="image", required=false) List<MultipartFile> files){
        String userId="1"; // 임시로 부여한 userId
        AccommodationArticleDto dto=service.save(request,userId,files);
        return new ResponseEntity(dto,HttpStatus.OK);
    }

    @PatchMapping("/{accommodation_id}")
    public ResponseEntity<AccommodationArticleDto> updateAccommodation(@PathVariable("accommodation_id") Long id, @RequestBody AccommodationArticleDto request){
        String userId="1"; // 임시로 부여한 userId
        AccommodationArticleDto dto=service.update(request,id,userId);
        return new ResponseEntity(dto,HttpStatus.OK);
    }

    @GetMapping(value = "/images")
    public ResponseEntity<byte[]> getImage(@RequestParam("image_path") String imagePath) throws IOException {
        System.out.println("파일 경로 "+imagePath);
        byte[] imageByteArray = service.findImage(imagePath);
        return new ResponseEntity(imageByteArray, HttpStatus.OK);
    }
}

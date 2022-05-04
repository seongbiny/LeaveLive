package leavelive.activity.controller;

import leavelive.activity.domain.dto.ActivityDto;
import leavelive.activity.service.ActivityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/activity")
@RequiredArgsConstructor
@Slf4j
public class ActivityController {
    private final ActivityService service;
    @GetMapping("/all/{activity_loc}")
    public ResponseEntity<List<ActivityDto>> getAllActivity(@PathVariable("activity_loc") String loc){
        List<ActivityDto> list=service.getAllAct(loc);
        return new ResponseEntity(list, HttpStatus.OK);
    }
    @GetMapping("/detail/{activity_id}")
    public ResponseEntity<ActivityDto> getActivity(@PathVariable("activity_id") Long id){
        ActivityDto response=service.getAct(id);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{activity_id}")
    public ResponseEntity<String> delActivity(@PathVariable("activity_id") Long id){
        String userId="1";
        String response=service.delAct(id,userId);
        return new ResponseEntity(response, HttpStatus.OK);
    }
    @PostMapping("/")
    public ResponseEntity<ActivityDto> delActivity(@RequestPart(value="dto") ActivityDto dto, @RequestPart(value="image", required=false) List<MultipartFile> files){
        String userId="1";
        ActivityDto response=service.saveAct(dto,files,userId);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @PatchMapping("/{activity_id}")
    public ResponseEntity<ActivityDto> updateActivity(@PathVariable("activity_id") Long id, @RequestBody ActivityDto request){
        String userId="1";
        ActivityDto response=service.updateAct(id,request,userId);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @GetMapping("/images")
    public ResponseEntity<byte[]> getActImg(@RequestParam("image_path") String imagePath) throws IOException {
        byte[] imageByteArray=service.findImage(imagePath);
        return new ResponseEntity(imageByteArray,HttpStatus.OK);
    }
}

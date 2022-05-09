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

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/activity")
@RequiredArgsConstructor
@Slf4j
public class ActivityController {
    private final ActivityService service;

    @GetMapping("/all")
    public ResponseEntity<List<ActivityDto>> getAllActivity(@RequestParam("activity_loc") String loc) {
        log.info("activity loc"+loc);
        List<ActivityDto> list = service.getAllAct(loc);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{activity_id}")
    public ResponseEntity<ActivityDto> getActivity(@PathVariable("activity_id") Long id) {
        ActivityDto response = service.getAct(id);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    @DeleteMapping("/{activity_id}")
    public ResponseEntity<Boolean> delActivity(HttpServletResponse response, @PathVariable("activity_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("ReservationController.getAllReservation.userId:" + userId);
        Boolean result = service.delAct(id, userId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<ActivityDto> delActivity(HttpServletResponse response, @RequestPart(value = "dto") ActivityDto dto, @RequestPart(value = "image", required = false) List<MultipartFile> files) {
        String userId = response.getHeader("userId");
        log.info("ReservationController.getAllReservation.userId:" + userId);
        ActivityDto result = service.saveAct(dto, files, userId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PatchMapping("/{activity_id}")
    public ResponseEntity<ActivityDto> updateActivity(HttpServletResponse response, @PathVariable("activity_id") Long id, @RequestPart(value = "request") ActivityDto request, @RequestPart(value = "image", required = false) List<MultipartFile> files) {
        String userId = response.getHeader("userId");
        log.info("ReservationController.getAllReservation.userId:" + userId);
        ActivityDto result = service.updateAct(id, request, userId, files);
        return new ResponseEntity(result, HttpStatus.OK);
    }

//    @GetMapping("/images")
//    public ResponseEntity<byte[]> getActImg(@RequestParam("image_path") String imagePath) throws IOException {
//        byte[] imageByteArray = service.findImage(imagePath);
//        return new ResponseEntity(imageByteArray, HttpStatus.OK);
//    }
}

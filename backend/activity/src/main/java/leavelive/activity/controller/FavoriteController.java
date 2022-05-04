package leavelive.activity.controller;

import leavelive.activity.domain.dto.ActivityDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/favorite")
@RequiredArgsConstructor
@Slf4j
public class FavoriteController {
//    @GetMapping("/")
//    public ResponseEntity<List<FavoriteDto>> getAllActivity(@PathVariable("activity_loc") String loc) {
//        log.info("activity loc"+loc);
//        List<ActivityDto> list = service.getAllAct(loc);
//        return new ResponseEntity(list, HttpStatus.OK);
//    }
}

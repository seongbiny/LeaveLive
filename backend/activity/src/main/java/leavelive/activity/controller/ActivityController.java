package leavelive.activity.controller;

import leavelive.activity.domain.dto.ActivityDto;
import leavelive.activity.service.ActivityService;
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
@RequestMapping("/api/activity")
@RequiredArgsConstructor
@Slf4j
public class ActivityController {
    private final ActivityService service;
    @GetMapping("/all/{activity_loc}")
    public ResponseEntity<List<ActivityDto>> getAllActivity(@PathVariable("activity_loc") String loc){
        List<ActivityDto> list=service.getAllAct(loc);
        return new ResponseEntity(list, HttpStatus.OK);
    }


}

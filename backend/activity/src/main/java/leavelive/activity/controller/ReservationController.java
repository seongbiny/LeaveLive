package leavelive.activity.controller;

import leavelive.activity.domain.dto.ReservationDto;
import leavelive.activity.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/activity/reservation")
@Slf4j
public class ReservationController {
    private final ReservationService service;

    @GetMapping("/")
    public ResponseEntity<List<ReservationDto>> getAllReservation(HttpServletResponse response){
//        String userId = response.getHeader("userId");
        String userId = "114760122369855290515GOOGLE";
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        List<ReservationDto> list = service.getAllRes(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

}

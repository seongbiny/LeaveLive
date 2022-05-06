package leavelive.activity.controller;

import leavelive.activity.domain.dto.ReservationDto;
import leavelive.activity.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/activity/reservation")
@Slf4j
public class ReservationController {
    private final ReservationService service;

    @GetMapping("/")
    public ResponseEntity<List<ReservationDto>> getAllReservation(HttpServletResponse response) {
        String userId = response.getHeader("userId");
        log.info("ReservationController.getAllReservation.userId:" + userId);
        List<ReservationDto> list = service.getAllRes(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @DeleteMapping("/{activity_reservation_id}")
    public ResponseEntity<String> delReservation(HttpServletResponse response, @PathVariable("activity_reservation_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("ReservationController.delReservation.userId:" + userId);
        String result = service.delRes(id, userId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping("/{activity_id}")
    public ResponseEntity<Long> saveReservation(HttpServletResponse response, @PathVariable("activity_id") Long id, @RequestBody ReservationDto dto) {
        String userId = response.getHeader("userId");
        log.info("ReservationController.saveReservation.userId:" + userId);
        Long result = service.saveRes(id, userId, dto);
        return new ResponseEntity(result, HttpStatus.OK);
    }

}

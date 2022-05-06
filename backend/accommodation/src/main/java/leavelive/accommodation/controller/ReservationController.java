package leavelive.accommodation.controller;

import leavelive.accommodation.domain.dto.AccommodationResDto;
import leavelive.accommodation.service.ReservationServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/accommodation/reservation")
@RequiredArgsConstructor
@Slf4j
public class ReservationController {
    private final ReservationServiceImpl service;

    @GetMapping("/")
    public ResponseEntity<List<AccommodationResDto>> getAllAccommodationFav(HttpServletResponse response) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        List<AccommodationResDto> list = service.findByUserId(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/{accommodation_id}")
    public ResponseEntity<Long> reservationAccommodation(HttpServletResponse response, @PathVariable("accommodation_id") Long id, @RequestBody AccommodationResDto request) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.reservationAccommodation.userId:" + userId);
        Long result = service.saveReservation(userId, id, request);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_res_id}")
    public ResponseEntity<Boolean> deleteAccommodationRes(HttpServletResponse response, @PathVariable("accommodation_res_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.deleteAccommodationRes.userId:" + userId);
        Boolean result = service.deleteReservation(userId, id);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}

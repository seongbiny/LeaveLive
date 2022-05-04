package leavelive.accommodation.controller;

import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.service.AccommodationFavServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api/accommodation/favorite")
@RequiredArgsConstructor
@Slf4j
public class AccommodationFavController {
    private final AccommodationFavServiceImpl service;

    @GetMapping("/")
    public ResponseEntity<List<AccommodationFavDto>> getAllAccommodationFav(HttpServletResponse response) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        List<AccommodationFavDto> list = service.getAllByUserId(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/{accommodation_id}")
    public ResponseEntity<AccommodationFavDto> saveAccommodationFav(HttpServletResponse response, @PathVariable("accommodation_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        AccommodationFavDto dto = service.save(id, userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_fav_id}")
    public ResponseEntity<Long> deleteAccommodationFav(HttpServletResponse response, @PathVariable("accommodation_fav_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        service.delete(id, userId);
        return new ResponseEntity<>(id, HttpStatus.OK);
    }

}

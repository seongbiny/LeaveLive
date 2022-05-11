package leavelive.accommodation.controller;

import leavelive.accommodation.domain.dto.FavoriteDto;
import leavelive.accommodation.service.FavoriteServiceImpl;
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
public class FavoriteController {
    private final FavoriteServiceImpl service;

    @GetMapping("/")
    public ResponseEntity<List<FavoriteDto>> getAllAccommodationFav(HttpServletResponse response) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        List<FavoriteDto> list = service.getAllByUserId(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping("/{accommodation_id}")
    public ResponseEntity<Long> saveAccommodationFav(HttpServletResponse response, @PathVariable("accommodation_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        Long result = service.save(id, userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{accommodation_fav_id}")
    public ResponseEntity<Boolean> deleteAccommodationFav(HttpServletResponse response, @PathVariable("accommodation_fav_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("AcommodationResController.getAllAccommodationFav.userId:" + userId);
        Boolean result=service.delete(id, userId);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}

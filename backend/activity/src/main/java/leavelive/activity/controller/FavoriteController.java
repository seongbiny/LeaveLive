package leavelive.activity.controller;

import leavelive.activity.domain.Favorite;
import leavelive.activity.domain.dto.ActivityDto;
import leavelive.activity.domain.dto.FavoriteDto;
import leavelive.activity.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api/activity/favorite")
@RequiredArgsConstructor
@Slf4j
public class FavoriteController {
    private final FavoriteService service;

    @GetMapping("/")
    public ResponseEntity<List<FavoriteDto>> getAllFavorite(HttpServletResponse response) {
        String userId = response.getHeader("userId");
        log.info("FavoriteController.getAllFav.userId:" + userId);
        List<FavoriteDto> list = service.getAllFav(userId);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @DeleteMapping("/{activity_id}")
    public ResponseEntity<Boolean> delFavorite(HttpServletResponse response,@PathVariable("activity_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("FavoriteController.delFavorite.userId:" + userId);
        Boolean result = service.delFav(id,userId);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping("/{activity_id}")
    public ResponseEntity<Long> saveFavorite(HttpServletResponse response,@PathVariable("activity_id") Long id) {
        String userId = response.getHeader("userId");
        log.info("FavoriteController.delFavorite.userId:" + userId);
        Long result = service.saveFav(id,userId);
        return new ResponseEntity(result, HttpStatus.OK);
    }
}

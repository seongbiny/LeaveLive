package leavelive.activity.service;

import leavelive.activity.domain.Favorite;
import leavelive.activity.domain.dto.FavoriteDto;
import leavelive.activity.repository.FavoriteRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepo repo;

    public List<FavoriteDto> getAllFav(String userId) {
        List<Favorite> entities = repo.findAllByUserId(userId);
        List<FavoriteDto> list = new ArrayList<>();
        FavoriteDto dto;
        for (Favorite entity : entities) {
            dto = new FavoriteDto();
            list.add(dto.of(entity));
        }
        return list;
    }

    public String delFav(Long id, String userId) {
        Optional<Favorite> entity = repo.findById(id);
        if(!entity.isPresent()) throw new NullPointerException("해당하는 즐겨찾기가 없습니다.");
        if(!entity.get().getUserId().equals(userId)) throw new NullPointerException("자신이 등록한 즐겨찾기만 삭제할 수 있습니다.");
        repo.deleteById(id);
        return "ok";
    }

}

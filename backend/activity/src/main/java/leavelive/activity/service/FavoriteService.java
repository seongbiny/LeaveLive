package leavelive.activity.service;

import leavelive.activity.domain.Activity;
import leavelive.activity.domain.Favorite;
import leavelive.activity.domain.dto.FavoriteDto;
import leavelive.activity.exception.MyResourceNotFoundException;
import leavelive.activity.repository.ActivityRepo;
import leavelive.activity.repository.FavoriteRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepo repo;
    private final ActivityRepo acRepo;

    public List<FavoriteDto> getAllFav(String userId) {
        List<Favorite> entities = repo.findAllByUserId(userId);
        return entities.stream().map(FavoriteDto::of).collect(Collectors.toList());
    }

    public Boolean delFav(Long id, String userId) {
        List<Favorite> entities = repo.findByIdAndUserId(id,userId);
        for(Favorite fav:entities){
            repo.deleteById(fav.getId());
        }
        return true;
    }

    public Long saveFav(Long id, String userId){
        Optional<Activity> activity = acRepo.findById(id);
        if(!activity.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        List<Favorite> entities = repo.findAllByUserId(userId);
        for (Favorite entity:entities){
            if(entity.getActivity().getId()==id){
                return 0L;
            }
        }
        FavoriteDto dto=new FavoriteDto();
        dto.setActivity(activity.get());
        dto.setUserId(userId);
        return  repo.save(Favorite.of(dto)).getId();
    }

}

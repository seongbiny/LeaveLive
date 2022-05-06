package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationFav;
import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.exception.MyResourceNotFoundException;
import leavelive.accommodation.repository.FavoriteRepository;
import leavelive.accommodation.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl {
    private final FavoriteRepository favRepo;
    private final AccommodationRepository repo;

    public List<AccommodationFavDto> getAllByUserId(String userId){
        List<AccommodationFav> entities=favRepo.findAllByUserId(userId);
        return entities.stream().map(AccommodationFavDto::of).collect(Collectors.toList());
    }
    public List<AccommodationFavDto> findAll(){
        List<AccommodationFav> entities=favRepo.findAll();
        return entities.stream().map(AccommodationFavDto::of).collect(Collectors.toList());
    }

    public Long save(Long id,String userId){
        Optional<AccommodationArticle> accommodationArticle= repo.findById(id);
        if(!accommodationArticle.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        List<AccommodationFav> entities=favRepo.findAllByUserId(userId);
        for(AccommodationFav entity:entities){
            if(entity.getAccommodationArticle().getId()==id){
                return 0L;
            }
        }
        AccommodationFavDto dto=new AccommodationFavDto();
        dto.setUserId(userId);
        dto.setAccommodationArticle(accommodationArticle.get());
        return favRepo.save(AccommodationFav.of(dto)).getId();
    }
    public Boolean delete(Long id,String userId){
        Optional<AccommodationFav> accommodationFav=favRepo.findById(id);
        if(!accommodationFav.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        if(!accommodationFav.get().getUserId().equals(userId)) throw new MyResourceNotFoundException("자신이 등록한 숙소만 삭제할 수 있습니다.");
        favRepo.deleteById(id);
        return true;
    }
}

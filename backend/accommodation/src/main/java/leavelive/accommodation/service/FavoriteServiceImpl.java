package leavelive.accommodation.service;

import leavelive.accommodation.domain.Accommodation;
import leavelive.accommodation.domain.Favorite;
import leavelive.accommodation.domain.dto.FavoriteDto;
import leavelive.accommodation.exception.MyResourceNotFoundException;
import leavelive.accommodation.repository.FavoriteRepository;
import leavelive.accommodation.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl {
    private final FavoriteRepository favRepo;
    private final AccommodationRepository repo;

    public List<FavoriteDto> getAllByUserId(String userId){
        List<Favorite> entities=favRepo.findAllByUserId(userId);
        return entities.stream().map(FavoriteDto::of).collect(Collectors.toList());
    }
    public List<FavoriteDto> findAll(){
        List<Favorite> entities=favRepo.findAll();
        return entities.stream().map(FavoriteDto::of).collect(Collectors.toList());
    }

    public Long save(Long id,String userId){
        Optional<Accommodation> accommodationArticle= repo.findById(id);
        if(!accommodationArticle.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        List<Favorite> entities=favRepo.findAllByUserId(userId);
        for(Favorite entity:entities){
            if(entity.getAccommodation().getId()==id){
                return 0L;
            }
        }
        FavoriteDto dto=new FavoriteDto();
        dto.setUserId(userId);
        dto.setAccommodation(accommodationArticle.get());
        return favRepo.save(Favorite.of(dto)).getId();
    }
    public Boolean delete(Long id,String userId){
        Optional<Favorite> accommodationFav=favRepo.findById(id);
        if(!accommodationFav.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        if(!accommodationFav.get().getUserId().equals(userId)) throw new MyResourceNotFoundException("자신이 등록한 숙소만 삭제할 수 있습니다.");
        favRepo.deleteById(id);
        return true;
    }
}

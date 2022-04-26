package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationFav;
import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.repository.AccommodationFavRepository;
import leavelive.accommodation.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccommodationFavServiceImpl {
    private final AccommodationFavRepository favRepo;
    private final AccommodationRepository repo;

    public List<AccommodationFavDto> findAll(){
        List<AccommodationFav> entities=favRepo.findAll();
        List<AccommodationFavDto> list=new ArrayList<>();
        for (int i=0; i<entities.size(); i++){
            AccommodationFavDto dto=new AccommodationFavDto();
            list.add(dto.of(entities.get(i)));
        }
        return list;
    }
    public AccommodationFavDto save(Long id,Long userId){
        Optional<AccommodationArticle> accommodationArticle= repo.findById(id);
        if(!accommodationArticle.isPresent()) throw new NullPointerException("해당하는 숙소가 없습니다.");
        AccommodationFavDto dto=new AccommodationFavDto();
        dto.setUserId(userId); //임의로 준 userId
        dto.setAccommodationArticle(accommodationArticle.get());
        AccommodationFav entity=new AccommodationFav();
        favRepo.save(entity.of(dto));
        return dto;
    }
}

package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationFav;
import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.repository.AccommodationFavRepository;
import leavelive.accommodation.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccommodationFavServiceImpl {
    private final AccommodationFavRepository favRepo;
    private final AccommodationRepository repo;

    public List<AccommodationFavDto> getAllByUserId(String userId){
        List<AccommodationFav> entities=favRepo.findByUserId(userId);
        List<AccommodationFavDto> list=new ArrayList<>();
        for (int i=0; i<entities.size(); i++){
            AccommodationFavDto dto=new AccommodationFavDto();
            list.add(dto.of(entities.get(i)));
        }
        return list;
    }
    public List<AccommodationFavDto> findAll(){
        List<AccommodationFav> entities=favRepo.findAll();
        List<AccommodationFavDto> list=new ArrayList<>();
        for (int i=0; i<entities.size(); i++){
            AccommodationFavDto dto=new AccommodationFavDto();
            list.add(dto.of(entities.get(i)));
        }
        return list;
    }

    public Long save(Long id,String userId){
        Optional<AccommodationArticle> accommodationArticle= repo.findById(id);
        if(!accommodationArticle.isPresent()) throw new NullPointerException("해당하는 숙소가 없습니다.");
        AccommodationFavDto dto=new AccommodationFavDto();
        dto.setUserId(userId); //임의로 준 userId
        dto.setAccommodationArticle(accommodationArticle.get());
        AccommodationFav entity=new AccommodationFav();
        AccommodationFav result=favRepo.save(entity.of(dto));
        return result.getId();
    }
    public String delete(Long id,String userId){
        Optional<AccommodationFav> accommodationFav=favRepo.findById(id);
        if(!accommodationFav.isPresent()) throw new NullPointerException("해당하는 숙소가 없습니다.");
        if(!accommodationFav.get().getUserId().equals(userId)) throw new NullPointerException("자신이 등록한 숙소만 삭제할 수 있습니다.");
        favRepo.deleteById(id);
        return "ok";
    }
}

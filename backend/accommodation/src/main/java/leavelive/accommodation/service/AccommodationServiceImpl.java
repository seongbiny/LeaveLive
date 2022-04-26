package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationFav;
import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import leavelive.accommodation.repository.AccommodationFavRepository;
import leavelive.accommodation.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccommodationServiceImpl implements AccommodationService{
    private final AccommodationRepository repo;
    private final AccommodationFavRepository favRepo;
    @Override
    public List<AccommodationArticleDto> getAllAccommodation() {
        List<AccommodationArticle> entities=repo.findAll();
        //entity를 dto로 변환
        List<AccommodationArticleDto> list=new ArrayList<>();
        for (int i=0; i<entities.size(); i++){
            AccommodationArticleDto dto=new AccommodationArticleDto();
            list.add(dto.of(entities.get(i)));
        }
        return list;
    }

    @Override
    public AccommodationArticleDto getAccommodation(Long id) {
        Optional<AccommodationArticle> entity=repo.findById(id);
        if(!entity.isPresent())throw new NullPointerException("해당하는 숙소가 없습니다.");
        //entity를 dto로 변환
        AccommodationArticleDto dto=new AccommodationArticleDto();
        return dto.of(entity.get());
    }

    @Override
    public Long delete(Long id) {
        // 연결되어있는거 먼저 삭제
        // id를 가지고 있는 모든 favRepo 찾고, 삭제
        List<AccommodationFav> list=favRepo.findAllByAcommodationId(id);
        if(list!=null) {
            System.out.println("해당 숙소에 등록된 즐겨찾기가 있습니다.");
//            favRepo.deleteByAccommodationId(id);
            for(AccommodationFav entity:list){
                favRepo.deleteById(entity.getId());
            }
        }
        repo.deleteById(id);
        return id;
    }

    @Override
    public AccommodationArticleDto save(AccommodationArticleDto dto) {
        AccommodationArticle entity=new AccommodationArticle();
        repo.save(entity.of(dto));
        return dto;
    }
}

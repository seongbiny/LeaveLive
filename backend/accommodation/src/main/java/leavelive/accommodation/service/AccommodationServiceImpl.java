package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import leavelive.accommodation.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccommodationServiceImpl implements AccommodationService{
    private final AccommodationRepository repo;
    @Override
    public List<AccommodationArticleDto> getAllAccommodation() {
        List<AccommodationArticle> entities=repo.findAll();
        //dto를 entity로 변환
        List<AccommodationArticleDto> list=new ArrayList<>();
        for (int i=0; i<entities.size(); i++){
            AccommodationArticleDto dto=new AccommodationArticleDto();
            list.add(dto.of(entities.get(i)));
        }
        return list;
    }
}

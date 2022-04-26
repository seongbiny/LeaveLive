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

    @Override
    public AccommodationArticleDto update(AccommodationArticleDto dto,Long id) {
        Optional<AccommodationArticle> entity=repo.findById(id);
        AccommodationArticle result=new AccommodationArticle();
        if(!entity.isPresent()) throw new NullPointerException("해당하는 숙소가 없습니다.");

        AccommodationArticleDto oriDto=new AccommodationArticleDto(); //현재 entity
        oriDto=oriDto.of(entity.get());
        oriDto.setId(id);
        oriDto.setAuthor(entity.get().getAuthor());
        // 바뀐 부분
        if(dto.getCnt()!=0){
            oriDto.setCnt(dto.getCnt());
        }
        if(dto.getContents()!=null){
            oriDto.setContents(dto.getContents());
        }
        if(dto.getPrice()!=0){
            oriDto.setPrice(dto.getPrice());
        }
        if(dto.getLoc()!=null){
            oriDto.setLoc(dto.getLoc());
        }
        if(dto.getName()!=null){
            oriDto.setName(dto.getName());
        }
        if(dto.getPicPath()!=null){
            oriDto.setPicPath(dto.getPicPath());
        }
        if(dto.getCooking()!=oriDto.getCooking()){
            oriDto.setCooking(dto.getCooking());
        }
        if(dto.getGarden()!=oriDto.getGarden()){
            oriDto.setGarden(dto.getGarden());
        }
        repo.save(result.updateOf(oriDto));
        return dto;
    }
}

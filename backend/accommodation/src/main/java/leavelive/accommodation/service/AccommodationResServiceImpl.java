package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationRes;
import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.domain.dto.AccommodationResDto;
import leavelive.accommodation.repository.AccommodationRepository;
import leavelive.accommodation.repository.AccommodationResRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccommodationResServiceImpl {
    private final AccommodationResRepository repo;
    private final AccommodationRepository articleRepo;

    public List<AccommodationResDto> findByUserId(String userId) {
        List<AccommodationRes> entities=repo.findByUserId(userId);
        if(entities==null) throw new NullPointerException("예약한 숙소가 없습니다.");
        List<AccommodationResDto> list=new ArrayList<>();
        for (int i=0; i<entities.size(); i++){
            AccommodationResDto dto=new AccommodationResDto();
            list.add(dto.of(entities.get(i)));
        }
        return list;
    }
    public Long saveReservation(String userId, Long id, AccommodationResDto request){
        Optional<AccommodationArticle> entity=articleRepo.findById(id);
        if(!entity.isPresent()) throw new NullPointerException("해당하는 숙소가 없습니다.");
        if(request.getStartDate().isAfter(request.getEndDate())) throw new NullPointerException("종료일이 시작일보다 앞입니다.");
        AccommodationResDto dto=new AccommodationResDto();
        dto.setAccommodationArticle(entity.get());
        dto.setUserId(userId);
        dto.setStartDate(request.getStartDate());
        dto.setEndDate(request.getEndDate());
        dto.setScheduleId(request.getScheduleId());
        log.info("AccommodationServiceTest.saveReservation.dto:"+dto);
        AccommodationRes accommodationRes=new AccommodationRes();
        AccommodationRes result=repo.save(accommodationRes.of(dto));
        return result.getId();
    }
}

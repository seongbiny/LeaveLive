package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationRes;
import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.domain.dto.AccommodationResDto;
import leavelive.accommodation.repository.AccommodationResRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccommodationResServiceImpl {
    private final AccommodationResRepository repo;
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
}

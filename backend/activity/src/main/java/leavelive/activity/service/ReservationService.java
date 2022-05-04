package leavelive.activity.service;

import leavelive.activity.domain.Reservation;
import leavelive.activity.domain.dto.ReservationDto;
import leavelive.activity.repository.ReservationRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {
    private final ReservationRepo repo;

    public List<ReservationDto> getAllRes(String userId){
        List<ReservationDto> result=new ArrayList<>();
        List<Reservation> entities=repo.findAllByUserId(userId);
        ReservationDto res;
        for(Reservation entity:entities){
            res=new ReservationDto();
            result.add(res.of(entity));
        }
        return result;
    }
    public String delRes(Long id, String userId){
        Optional<Reservation> entity=repo.findById(id);
        if(!entity.isPresent()) throw new NullPointerException("해당하는 액티비티가 없습니다.");
        if(!entity.get().getUserId().equals(userId)) throw new NullPointerException("자신이 예약한 액티비티만 삭제할 수 있습니다.");
        repo.deleteById(id);
        return "ok";
    }
}

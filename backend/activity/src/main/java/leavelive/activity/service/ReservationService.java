package leavelive.activity.service;

import leavelive.activity.domain.Reservation;
import leavelive.activity.domain.dto.ReservationDto;
import leavelive.activity.repository.ReservationRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
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
}

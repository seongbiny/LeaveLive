package leavelive.activity.service;

import leavelive.activity.domain.Activity;
import leavelive.activity.domain.dto.ActivityDto;
import leavelive.activity.repository.ActivityRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityService {
    private final ActivityRepo repo;

    public List<ActivityDto> getAllAct(String loc){
        List<Activity> entities=repo.findByLocStartsWith(loc);
        List<ActivityDto> dtos=new ArrayList<>();
        ActivityDto dto=new ActivityDto();
        for(Activity entity:entities){
            dto=new ActivityDto();
            dtos.add(dto.of(entity));
        }
        return dtos;
    }
}

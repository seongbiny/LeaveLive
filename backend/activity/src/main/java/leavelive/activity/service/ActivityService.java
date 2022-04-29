package leavelive.activity.service;

import leavelive.activity.domain.Activity;
import leavelive.activity.domain.dto.ActivityDto;
import leavelive.activity.repository.ActivityRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public ActivityDto getAct(Long id){
        Optional<Activity> entity=repo.findById(id);
        if(!entity.isPresent()) throw new NullPointerException("해당하는 액티비티가 없습니다.");
        ActivityDto dto=new ActivityDto();
        return dto.of(entity.get());
    }
    public String delAct(Long id,String userId){
        // userId 있는지 확인
        Optional<Activity> entity=repo.findById(id);
        if(!entity.isPresent()) throw new NullPointerException("해당하는 액티비티가 없습니다.");
        if(!entity.get().getUserId().equals(userId)) throw new NullPointerException("직접 등록한 액티비티만 삭제할 수 있습니다.");
        repo.deleteById(id);
        return "ok";
    }
}

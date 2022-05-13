package leavelive.activity.service;

import leavelive.activity.domain.Activity;
import leavelive.activity.domain.Reservation;
import leavelive.activity.domain.dto.ReservationDto;
import leavelive.activity.domain.dto.ReservationResDto;
import leavelive.activity.exception.MyResourceNotFoundException;
import leavelive.activity.repository.ActivityRepo;
import leavelive.activity.repository.ReservationRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.Charset;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationService {
    private final ReservationRepo repo;
    private final ActivityRepo activityRepo;

    public List<ReservationDto> getAllRes(String userId){
        List<ReservationDto> result=new ArrayList<>();
        List<Reservation> entities=repo.findAllByUserId(userId);
        return entities.stream().map(ReservationDto::of).collect(Collectors.toList());
    }
    public Boolean delRes(Long id, String userId){
        Optional<Reservation> entity=repo.findById(id);
        if(!entity.isPresent()) throw new MyResourceNotFoundException("해당하는 액티비티가 없습니다.");
        if(!entity.get().getUserId().equals(userId)) throw new MyResourceNotFoundException("자신이 예약한 액티비티만 삭제할 수 있습니다.");
        repo.deleteById(id);
        return true;
    }

    /**
     * 예약 날짜에 따라 예약 여부가 결정됨
     * @param id
     * @param userId
     * @return 예약된 아이디
     */
    public Long saveRes(Long id, String userId, ReservationDto request){
        Optional<Activity> entity=activityRepo.findById(id);
        if(!entity.isPresent()) throw new MyResourceNotFoundException("해당하는 액티비티가 없습니다.");
        LocalDate myStart=request.getStartDate();
        LocalDate myEnd=request.getEndDate();
        if(myStart.isAfter(myEnd)) throw new MyResourceNotFoundException("종료일이 시작일보다 앞입니다.");
        if(request.getCnt()<=0 || request.getCnt()>entity.get().getCnt()) throw new MyResourceNotFoundException("인원수가 0이하거나 수용할 수 있는 인원을 초과했습니다.");
        List<Reservation> list=repo.findByActivityId(id);
        log.info("ReservationService.saveRes.list:"+list);
        if(list!=null || list.size()>0){
            boolean flag=true;
            for (Reservation res:list){
                LocalDate start=res.getStartDate();
                LocalDate end=res.getEndDate();
                if(!start.isEqual(myStart) && !end.isEqual(myEnd)){
                    /**
                     * myStart와 myEnd가 구간 안에 있으면 이미 예약되어있으므로 예약 불가
                     * start= 0419  myStart= 0421
                     * end= 0421  myEnd= 0422
                     * start<=myStart<end ->x
                     * start<myEnd<=end ->x
                     */
                    log.info("ReservationService.saveRes:"+start+"<="+myStart+"<"+end);
                    // 범위 안에 포함되면 X
                    if(!myStart.isBefore(start) && myStart.isBefore(end)){
                        log.info("ReservationService.saveRes:시작날짜가 잘못되었음");
                        flag=false;
                        break;
                    }
                    start=start.plusDays(1);
                    log.info("ReservationService.saveRes:"+start+"<"+myEnd+"<="+end);
                    if(!myEnd.isBefore(start) && myEnd.isBefore(end)){
                        log.info("ReservationService.saveRes:종료날짜가 잘못되었음");
                        flag=false;
                        break;
                    }
                }else{
                    flag=false;
                    break;
                }
            }
            if(!flag) throw new MyResourceNotFoundException("이미 해당 기간에 예약되어 있는 숙소입니다.");
        }
        request.setActivity(entity.get());
        request.setUserId(userId);
        return repo.save(Reservation.of(request)).getId();
    }

    public List<ReservationResDto> getAllMyRes(String userId){
        List<Activity> entities=activityRepo.findAllByUserId(userId);
        List<ReservationResDto> result=new ArrayList<>();
        for(Activity act:entities){
            List<Reservation> list=repo.findByActivityId(act.getId());
            for(Reservation res:list){
                ReservationResDto req=ReservationResDto.of(res);
                req.setNickname(getNickName(userId));
                result.add(req);
            }
        }
        return result;
    }

    public String getNickName(String userId){
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("application","json", Charset.forName("UTF-8"))); //json으로 설정
        HttpEntity<?> requestMessage = new HttpEntity<>(httpHeaders);
        //requestMessage 만들기
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://k6c105.p.ssafy.io:8083/api/user/info/"+userId;
        String nickname="";
        try{
            //요청하기
            ResponseEntity<Map> responseEntity=restTemplate.getForEntity(url,Map.class,requestMessage);
            log.info("ReservationServiceImpl.getAllMyReservation.response:"+responseEntity.getBody().get("nickname"));
            nickname= (String) responseEntity.getBody().get("nickname");
        }catch (Exception e){
            e.printStackTrace();
            log.error("HttpInterceptor.preHandle.response:error");
        }
        return nickname;
    }
}

package leavelive.accommodation.service;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationRes;
import leavelive.accommodation.domain.dto.AccommodationResDto;
import leavelive.accommodation.domain.dto.AccommodationResRes;
import leavelive.accommodation.exception.MyResourceNotFoundException;
import leavelive.accommodation.repository.AccommodationRepository;
import leavelive.accommodation.repository.ReservationRepository;
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
public class ReservationServiceImpl {
    private final ReservationRepository repo;
    private final AccommodationRepository articleRepo;

    public List<AccommodationResDto> findByUserId(String userId) {
        List<AccommodationRes> entities=repo.findByUserId(userId);
        if(entities==null) throw new MyResourceNotFoundException("예약한 숙소가 없습니다.");
        List<AccommodationResDto> list=entities.stream().map(AccommodationResDto::of).collect(Collectors.toList());
        return list;
    }

    public List<AccommodationResDto> findAllByAccommodatinoId(Long id){
        List<AccommodationRes> entities=repo.findByAccommodationArticleId(id);
        List<AccommodationResDto> list=entities.stream().map(AccommodationResDto::of).collect(Collectors.toList());
        return list;
    }

    /**
     * 예약할 수 있는 날짜인지 확인
     * myStart와 myEnd가 구간 안에 있으면 이미 예약되어있으므로 예약 불가
     * start<=myStart<end ->x
     * start<myEnd<=end ->x
     */
    public Long saveReservation(String userId, Long id, AccommodationResDto request){
        Optional<AccommodationArticle> entity=articleRepo.findById(id);
        LocalDate myStart=request.getStartDate();
        LocalDate myEnd=request.getEndDate();
        if(!entity.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        if(myStart.isAfter(myEnd)) throw new MyResourceNotFoundException("종료일이 시작일보다 앞입니다.");
        if(request.getCnt()<=0 || request.getCnt()>entity.get().getCnt()) throw new MyResourceNotFoundException("인원수가 0이하거나 수용할 수 있는 인원을 초과했습니다.");
        List<AccommodationRes> list=repo.findByAccommodationArticleId(id);
        log.info("AccommodationResService.saveReservation.list:"+list);
        if(list!=null || list.size()>0){
            boolean flag=true;
            for (AccommodationRes res:list){
                LocalDate start=res.getStartDate();
                LocalDate end=res.getEndDate();
                if(!start.isEqual(myStart) && !end.isEqual(myEnd)){
                    if(!myStart.isBefore(start) && myStart.isBefore(end)){
                        log.info("AccommodationResService.saveReservation:시작날짜가 잘못되었음");
                        flag=false;
                        break;
                    }
                    start=start.plusDays(1);
                    if(!myEnd.isBefore(start) && myEnd.isBefore(end)){
                        log.info("AccommodationResService.saveReservation:종료날짜가 잘못되었음");
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
        request.setAccommodationArticle(entity.get());
        request.setUserId(userId);
        return repo.save(AccommodationRes.of(request)).getId();
    }
    public Boolean deleteReservation(String userId,Long id){
        Optional<AccommodationRes> entity=repo.findById(id);
        if(!entity.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        if(!entity.get().getUserId().equals(userId)) throw new MyResourceNotFoundException("자신이 등록한 예약만 삭제할 수 있습니다.");
        repo.deleteById(id);
        return true;
    }

    /**
     * 자신이 등록한 숙소에 대한 모든 예약 목록
     * @param userId
     * @return
     */
    public List<AccommodationResRes> getAllMyReservation(String userId){
        List<AccommodationArticle> entities=articleRepo.findAllByUserId(userId);
        List<AccommodationResRes> result=new ArrayList<>();
        for(AccommodationArticle article:entities){
            List<AccommodationRes> list=repo.findByAccommodationArticleId(article.getId());
            for(AccommodationRes res:list) {
                AccommodationResRes req= AccommodationResRes.of(res);
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

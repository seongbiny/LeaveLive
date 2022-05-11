package leavelive.accommodation.domain.dto;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationRes;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class AccommodationResReq {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String userId;
    private String nickname;
    private int cnt;
    private AccommodationArticle accommodationArticle;
    private Long scheduleId;

    public static AccommodationResReq of(AccommodationRes entity){
        return AccommodationResReq.builder()
                .id(entity.getId())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .userId(entity.getUserId())
                .cnt(entity.getCnt())
                .accommodationArticle(entity.getAccommodationArticle())
                .scheduleId(entity.getScheduleId())
                .build();
    }
}

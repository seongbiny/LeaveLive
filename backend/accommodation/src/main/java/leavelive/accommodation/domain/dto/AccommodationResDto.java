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
public class AccommodationResDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String userId;
    private int cnt;
    private AccommodationArticle accommodationArticle;
    private Long scheduleId;

    public static AccommodationResDto of(AccommodationRes entity){
        return AccommodationResDto.builder()
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

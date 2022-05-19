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
public class AccommodationResNope {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String userId;
    private String nickname;
    private int cnt;

    public static AccommodationResNope of(AccommodationRes entity){
        return AccommodationResNope.builder()
                .id(entity.getId())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .userId(entity.getUserId())
                .cnt(entity.getCnt())
                .build();
    }
}

package leavelive.accommodation.domain.dto;

import leavelive.accommodation.domain.Accommodation;
import leavelive.accommodation.domain.Reservation;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ReservationResDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String userId;
    private String nickname;
    private int cnt;
    private Accommodation accommodation;
    private Long scheduleId;

    public static ReservationResDto of(Reservation entity){
        return ReservationResDto.builder()
                .id(entity.getId())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .userId(entity.getUserId())
                .cnt(entity.getCnt())
                .accommodation(entity.getAccommodation())
                .scheduleId(entity.getScheduleId())
                .build();
    }
}

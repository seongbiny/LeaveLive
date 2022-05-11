package leavelive.activity.domain.dto;

import leavelive.activity.domain.Activity;
import leavelive.activity.domain.Reservation;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ReservationResDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String userId;
    private String nickname;
    private Activity activity;
    private Long scheduleId;
    private int cnt;

    public static ReservationResDto of(Reservation entity){
        return ReservationResDto.builder()
                .id(entity.getId())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .userId(entity.getUserId())
                .cnt(entity.getCnt())
                .activity(entity.getActivity())
                .scheduleId(entity.getScheduleId())
                .build();
    }
}

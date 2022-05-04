package leavelive.activity.domain.dto;

import leavelive.activity.domain.Activity;
import leavelive.activity.domain.Reservation;
import lombok.*;

import javax.persistence.Table;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ReservationDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private String userId;
    private Activity activity;
    private Long scheduleId;
    private int cnt;

    public ReservationDto of(Reservation entity){
        return ReservationDto.builder()
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

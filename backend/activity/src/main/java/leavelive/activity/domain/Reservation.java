package leavelive.activity.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import leavelive.activity.domain.dto.ReservationDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
@Table(name = "activity_reservation")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name="activity_reservation_id")
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;

    @Column(name="user_id")
    private String userId;

    @ManyToOne
    @JoinColumn(name = "activity_article_id")
    private Activity activity;

    @Column(name="schedule_id")
    private Long scheduleId;

    private int cnt;

    public Reservation of(ReservationDto dto){
        return Reservation.builder()
                .userId(dto.getUserId())
                .activity(dto.getActivity())
                .endDate(dto.getEndDate())
                .startDate(dto.getStartDate())
                .scheduleId(dto.getScheduleId())
                .cnt(dto.getCnt())
                .build();
    }
}

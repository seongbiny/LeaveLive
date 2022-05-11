package leavelive.accommodation.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import leavelive.accommodation.domain.dto.ReservationDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name="accommodation_reservation_id")
    private Long id;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDate endDate;

    @Column(name="user_id")
    private String userId;

    @ManyToOne
    @JoinColumn(name = "accommodation_article_id")
    private Accommodation accommodation;

    @Column(name="schedule_id")
    private Long scheduleId;

    private int cnt;

    public static Reservation of(ReservationDto dto){
        return Reservation.builder()
                .userId(dto.getUserId())
                .accommodation(dto.getAccommodation())
                .endDate(dto.getEndDate())
                .startDate(dto.getStartDate())
                .scheduleId(dto.getScheduleId())
                .cnt(dto.getCnt())
                .build();
    }
}

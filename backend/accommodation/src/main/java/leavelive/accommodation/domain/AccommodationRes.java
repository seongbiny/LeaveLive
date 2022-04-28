package leavelive.accommodation.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class AccommodationRes {
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
    private AccommodationArticle accommodationArticle;

    @Column(name="schedule_id")
    private Long scheduleId;

    public AccommodationRes of(AccommodationRes dto){
        return AccommodationRes.builder()
                .userId(dto.getUserId())
                .accommodationArticle(dto.getAccommodationArticle())
                .endDate(dto.getEndDate())
                .startDate(dto.getStartDate())
                .scheduleId(dto.getScheduleId())
                .build();
    }
}

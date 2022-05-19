package leavelive.activity.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import leavelive.activity.domain.dto.FavoriteDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "activity_fav")
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="activity_fav_id")
    private Long id;

    @Column(name="user_id")
    private String userId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "activity_id")

    private Activity activity;

    public static Favorite of(FavoriteDto dto){
        return Favorite.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .activity(dto.getActivity())
                .build();
    }
}

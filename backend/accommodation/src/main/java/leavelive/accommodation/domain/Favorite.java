package leavelive.accommodation.domain;

import leavelive.accommodation.domain.dto.FavoriteDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="accommodation_fav_id")
    private Long id;

    @Column(name="user_id")
    private String userId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "accommodation_article_id")

    private Accommodation accommodation;

    public static Favorite of(FavoriteDto dto){
        return Favorite.builder()
                .id(dto.getId())
                .userId(dto.getUserId())
                .accommodation(dto.getAccommodation())
                .build();
    }


}

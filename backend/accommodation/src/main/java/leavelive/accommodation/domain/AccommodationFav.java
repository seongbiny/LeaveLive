package leavelive.accommodation.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AccommodationFav {
    @Id
    @GeneratedValue
    @Column(name="accommodation_fav_id")
    private Long id;

    @Column(name="user_id")
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "id")
    private AccommodationArticle accommodationArticle;


}

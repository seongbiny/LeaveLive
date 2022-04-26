package leavelive.accommodation.domain.dto;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationFav;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class AccommodationFavDto {
    private Long id;
    private Long userId;
    private AccommodationArticle accommodationArticle;

    public AccommodationFavDto of(AccommodationFav entity){
        return AccommodationFavDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .accommodationArticle(entity.getAccommodationArticle())
                .build();
    }
}

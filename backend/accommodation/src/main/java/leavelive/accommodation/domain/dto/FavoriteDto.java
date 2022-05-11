package leavelive.accommodation.domain.dto;

import leavelive.accommodation.domain.Accommodation;
import leavelive.accommodation.domain.Favorite;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class FavoriteDto {
    private Long id;
    private String userId;
    private Accommodation accommodation;

    public static FavoriteDto of(Favorite entity){
        return FavoriteDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .accommodation(entity.getAccommodation())
                .build();
    }
}

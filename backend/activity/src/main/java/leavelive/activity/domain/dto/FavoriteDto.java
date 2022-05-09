package leavelive.activity.domain.dto;

import leavelive.activity.domain.Activity;
import leavelive.activity.domain.Favorite;
import lombok.*;

import javax.persistence.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class FavoriteDto {
    private Long id;
    private String userId;
    private Activity activity;

    public static FavoriteDto of(Favorite entity){
        return FavoriteDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .activity(entity.getActivity())
                .build();
    }
}

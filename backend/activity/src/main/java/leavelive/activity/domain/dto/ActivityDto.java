package leavelive.activity.domain.dto;

import leavelive.activity.domain.Activity;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ActivityDto {
    private Long id;
    private String loc;
    private int cnt;
    private int price;
    private String picPath;
    private String contents;
    private String name;
    private String userId;

    public static ActivityDto of(Activity entity){
        return ActivityDto.builder()
                .id(entity.getId())
                .name(entity.getName())
                .contents(entity.getContents())
                .cnt(entity.getCnt())
                .loc(entity.getLoc())
                .price(entity.getPrice())
                .picPath(entity.getPicPath())
                .userId(entity.getUserId())
                .build();
    }
}

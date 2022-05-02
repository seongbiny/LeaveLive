package leavelive.activity.domain;

import leavelive.activity.domain.dto.ActivityDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "activity_article")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "activity_id")
    private Long id;

    private String loc;
    private int cnt;
    private int price;
    @Column(name = "pic_path", columnDefinition = "TEXT")
    private String picPath;
    @Column(columnDefinition = "TEXT")
    private String contents;
    private String name;
    @Column(name = "user_id")
    private String userId;

    public Activity of(ActivityDto dto){
        return Activity.builder()
                .name(dto.getName())
                .contents(dto.getContents())
                .cnt(dto.getCnt())
                .loc(dto.getLoc())
                .picPath(dto.getPicPath())
                .price(dto.getPrice())
                .userId(dto.getUserId())
                .build();
    }

}

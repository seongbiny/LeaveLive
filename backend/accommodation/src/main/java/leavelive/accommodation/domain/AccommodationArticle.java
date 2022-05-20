package leavelive.accommodation.domain;

import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class AccommodationArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accommodation_article_id")
    private Long id;
    private String loc;
//    @Column(name = "nickname")
//    private String author;
    @Column(name = "user_id")
    private String userId;
    private int price;
    @Column(name = "pic_path", columnDefinition = "TEXT")
    private String picPath; //,로 구분
    private int cnt;
    private String garden;
    private String cooking;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String contents;
    private String name;

//    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
//    private List<AccommodationFav> favorite=new ArrayList<>();

    // dto -> entity
    public static AccommodationArticle of(AccommodationArticleDto dto){
        return AccommodationArticle.builder()
                .loc(dto.getLoc())
                .price(dto.getPrice())
                .picPath(dto.getPicPath())
                .cnt(dto.getCnt())
                .cooking(dto.getCooking())
                .garden(dto.getGarden())
                .contents(dto.getContents())
                .name(dto.getName())
                .userId(dto.getUserId())
                .build();
    }
    // update용 dto -> entity
    public static AccommodationArticle updateOf(AccommodationArticleDto dto){
        return AccommodationArticle.builder()
                .id(dto.getId())
                .loc(dto.getLoc())
                .price(dto.getPrice())
                .picPath(dto.getPicPath())
                .cnt(dto.getCnt())
                .cooking(dto.getCooking())
                .garden(dto.getGarden())
                .contents(dto.getContents())
                .name(dto.getName())
                .userId(dto.getUserId())
                .build();
    }
}

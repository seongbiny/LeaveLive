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
public class AccommodationArticle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "accommodation_article_id")
    private Long id;
    private String loc;
    private String author;
    private int price;
    @Column(name = "pic_path")
    private String picPath; //,로 구분
    private int cnt;
    private int garden;
    private int cooking;
    @Column(columnDefinition = "TEXT")
    private String contents;
    private String name;

//    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
//    private List<AccommodationFav> favorite=new ArrayList<>();

    // dto -> entity
    public AccommodationArticle of(AccommodationArticleDto dto){
        return AccommodationArticle.builder()
                .author(dto.getAuthor())
                .loc(dto.getLoc())
                .price(dto.getPrice())
                .picPath(dto.getPicPath())
                .cnt(dto.getCnt())
                .cooking(dto.getCooking())
                .garden(dto.getGarden())
                .contents(dto.getContents())
                .name(dto.getName())
                .build();
    }


}

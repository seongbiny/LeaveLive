package leavelive.accommodation.domain;

import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AccommodationArticle {
    @Id
    @GeneratedValue
    @Column(name = "accommodation_article_id")
    private Long id;
    private String loc;
    private String author;
    private int price;
    @Column(name = "pic_path")
    private String picPath; //type 뭘로?
    private int count;
    private int garden;
    private int cooking;

    // dto -> entity
    public AccommodationArticle of(AccommodationArticleDto dto){
        return AccommodationArticle.builder()
                .author(dto.getAuthor())
                .loc(dto.getLoc())
                .price(dto.getPrice())
                .picPath(dto.getPicPath())
                .count(dto.getCount())
                .cooking(dto.getCooking())
                .garden(dto.getGarden())
                .build();
    }


}

package leavelive.accommodation.domain.dto;

import leavelive.accommodation.domain.AccommodationArticle;
import lombok.*;

import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccommodationArticleDto {
    private Long id;
    private String loc;
    private String author;
    private int price;
    private String picPath; //type 뭘로?
    private int count;
    private int garden;
    private int cooking;

    // entity -> dto
    public static AccommodationArticleDto of(AccommodationArticle article) {
        return AccommodationArticleDto.builder()
                .id(article.getId())
                .loc(article.getLoc())
                .author(article.getAuthor())
                .price(article.getPrice())
                .picPath(article.getPicPath())
                .count(article.getCount())
                .garden(article.getGarden())
                .cooking(article.getCooking())
                .build();
    }
}

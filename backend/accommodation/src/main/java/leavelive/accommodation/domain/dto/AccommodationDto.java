package leavelive.accommodation.domain.dto;

import leavelive.accommodation.domain.Accommodation;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccommodationDto {
    private Long id;
    private String loc;
//    private String author;
    private int price;
    private String picPath; //type 뭘로?
    private int cnt;
    private String garden;
    private String cooking;
    private String contents;
    private String name;
    private String userId;

    // entity -> dto
    public static AccommodationDto of(Accommodation article) {
        return AccommodationDto.builder()
                .id(article.getId())
                .loc(article.getLoc())
//                .author(article.getAuthor())
                .price(article.getPrice())
                .picPath(article.getPicPath())
                .cnt(article.getCnt())
                .garden(article.getGarden())
                .cooking(article.getCooking())
                .contents(article.getContents())
                .name(article.getName())
                .userId(article.getUserId())
                .build();
    }
}

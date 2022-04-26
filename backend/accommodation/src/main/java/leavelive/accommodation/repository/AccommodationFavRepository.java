package leavelive.accommodation.repository;

import leavelive.accommodation.domain.AccommodationFav;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccommodationFavRepository extends JpaRepository<AccommodationFav,Long> {
//    @Query(value = "delete from AccommodationFav i where i.accommodationArticle.id=:accommodation_id")
//    void deleteByAccommodationId(@Param("accommodation_article_id") Long id);
}

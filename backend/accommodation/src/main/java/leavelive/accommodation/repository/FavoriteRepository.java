package leavelive.accommodation.repository;

import leavelive.accommodation.domain.AccommodationFav;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<AccommodationFav,Long> {
    @Query(value = "delete from AccommodationFav i where i.accommodationArticle.id=:id")
    void deleteByAccommodationId(@Param("id") Long id);

    @Query(value="select i from AccommodationFav i where i.accommodationArticle.id=:id")
    List<AccommodationFav> findAllByAcommodationId(@Param("id") Long id);

    List<AccommodationFav> findAllByUserId(String userId);
}

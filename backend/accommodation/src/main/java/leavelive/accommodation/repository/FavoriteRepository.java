package leavelive.accommodation.repository;

import leavelive.accommodation.domain.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite,Long> {
    @Query(value = "delete from Favorite i where i.accommodationArticle.id=:id")
    void deleteByAccommodationId(@Param("id") Long id);

    @Query(value="select i from Favorite i where i.accommodationArticle.id=:id")
    List<Favorite> findAllByAcommodationId(@Param("id") Long id);

    List<Favorite> findAllByUserId(String userId);
}

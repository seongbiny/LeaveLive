package leavelive.accommodation.repository;

import leavelive.accommodation.domain.AccommodationRes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccommodationResRepository extends JpaRepository<AccommodationRes,Long> {
    @Query(value = "select i from AccommodationRes i where i.userId=:userId")
    List<AccommodationRes> findByUserId(@Param("userId") String userId);
    List<AccommodationRes> findByAccommodationArticleId(@Param("id") Long id);
}

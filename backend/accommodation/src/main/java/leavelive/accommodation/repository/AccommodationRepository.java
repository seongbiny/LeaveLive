package leavelive.accommodation.repository;

import leavelive.accommodation.domain.AccommodationArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccommodationRepository extends JpaRepository<AccommodationArticle,Long> {
    @Override
    Optional<AccommodationArticle> findById(Long id);

//    @Query(value = "select i from AccommodationArticle i where i.loc like ':loc%'")
//    List<AccommodationArticle> findAllByLoc(@Param("loc") String loc);
    List<AccommodationArticle> findByLocEndingWith(String loc);
}

package leavelive.accommodation.repository;

import leavelive.accommodation.domain.Accommodation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccommodationRepository extends JpaRepository<Accommodation,Long> {
    @Override
    Optional<Accommodation> findById(Long id);
//    @Query(value = "select i from AccommodationArticle i where i.loc like ':loc%'")
    List<Accommodation> findAllByLocStartsWith(String loc);
    List<Accommodation> findAllByUserId(String userId);
}

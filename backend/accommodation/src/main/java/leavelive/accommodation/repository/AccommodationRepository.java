package leavelive.accommodation.repository;

import leavelive.accommodation.domain.AccommodationArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccommodationRepository extends JpaRepository<AccommodationArticle,Long> {
    @Override
    Optional<AccommodationArticle> findById(Long id);
}

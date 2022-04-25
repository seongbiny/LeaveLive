package leavelive.accommodation.repository;

import leavelive.accommodation.domain.AccommodationArticle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccommodationRepository extends JpaRepository<AccommodationArticle,Long> {
}

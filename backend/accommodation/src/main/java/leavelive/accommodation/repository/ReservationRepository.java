package leavelive.accommodation.repository;

import leavelive.accommodation.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    @Query(value = "select i from Reservation i where i.userId=:userId")
    List<Reservation> findByUserId(@Param("userId") String userId);
    List<Reservation> findByAccommodationArticleId(@Param("id") Long id);
}

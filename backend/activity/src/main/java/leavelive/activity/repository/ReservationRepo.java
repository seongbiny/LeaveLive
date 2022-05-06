package leavelive.activity.repository;


import leavelive.activity.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReservationRepo extends JpaRepository<Reservation,Long> {
    List<Reservation> findAllByUserId(String userId);
    @Query(value = "select i from Reservation i where i.activity.id=:id")
    List<Reservation> findByActivityId(@Param("id") Long id);
}

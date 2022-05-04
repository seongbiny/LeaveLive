package leavelive.activity.repository;


import leavelive.activity.domain.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservationRepo extends JpaRepository<Reservation,Long> {
    List<Reservation> findAllByUserId(String userId);
}

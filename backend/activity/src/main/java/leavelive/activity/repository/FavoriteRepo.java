package leavelive.activity.repository;

import leavelive.activity.domain.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepo extends JpaRepository<Favorite,Long> {
    List<Favorite> findAllByUserId(String userId);
}

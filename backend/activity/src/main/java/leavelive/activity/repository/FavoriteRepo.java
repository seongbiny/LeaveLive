package leavelive.activity.repository;

import leavelive.activity.domain.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.websocket.server.PathParam;
import java.util.List;

public interface FavoriteRepo extends JpaRepository<Favorite,Long> {
    List<Favorite> findAllByUserId(String userId);

    @Query(value = "select i from Favorite i where i.activity.id=:id")
    List<Favorite> findAllByActivityId(@Param("id") Long id);
}

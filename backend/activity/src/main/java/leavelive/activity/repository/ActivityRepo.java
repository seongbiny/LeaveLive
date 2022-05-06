package leavelive.activity.repository;

import leavelive.activity.domain.Activity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ActivityRepo extends JpaRepository<Activity,Long> {
    List<Activity> findAllByLocStartsWith(String loc);
//    @Query(value="select i from Activity i where i.loc like :loc%")
//    List<Activity> findByLikeLoc(@Param("loc") String loc);
}

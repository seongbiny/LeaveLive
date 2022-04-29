package leavelive.activity.repository;

import leavelive.activity.domain.Activity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepo extends JpaRepository<Activity,Long> {
    List<Activity> findByLocStartsWith(String loc);
}

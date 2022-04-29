package leavelive.activity;

import leavelive.activity.domain.dto.ActivityDto;
import leavelive.activity.service.ActivityService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
class ActivityServiceTests {
	Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	ActivityService service;

	@Test
	@Transactional
	public void getAllActByLocTest() {
		String loc="광주";
		List<ActivityDto> dtos=service.getAllAct(loc);
		log.info("ActivityServiceTests.getAllActByLocTest.dtos:"+dtos);
	}

	@Test
	@Transactional
	public void getActTest() {
		Long id=2L;
		ActivityDto dto=service.getAct(id);
		log.info("ActivityServiceTests.getActTest.dto:"+dto);
	}

}

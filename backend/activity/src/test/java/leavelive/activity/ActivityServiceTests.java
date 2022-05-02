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

	@Test
	@Transactional
	public void delActTest() {
		Long id=2L;
		String userId="1";
		String response=service.delAct(id,userId);
		log.info("ActivityServiceTests.delActTest.response:"+response);
	}
	@Test
	@Transactional
	public void updateActTest(){
		ActivityDto dto=new ActivityDto();
		dto.setPrice(1);
		dto.setContents("내용 수정");
		service.updateAct(3L,dto,"2");

		log.info("ActivityApplicationTests.updateActTest.Activity:"+service.getAct(3L));
	}

}

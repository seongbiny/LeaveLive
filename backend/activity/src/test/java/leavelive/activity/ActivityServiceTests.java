package leavelive.activity;

import leavelive.activity.domain.dto.ActivityDto;
import leavelive.activity.service.ActivityService;
import leavelive.activity.service.FavoriteService;
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

	@Autowired
	FavoriteService favService;

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

	@Test
	@Transactional
	public void getAllFavTest(){
		log.info("ActivityApplicationTests.getAllFavTest.list:"+favService.getAllFav("114760122369855290515GOOGLE"));
	}

	@Test
	@Transactional
	public void delFavTest(){
		favService.delFav(1L,"114760122369855290515GOOGLE");
		log.info("ActivityApplicationTests.delFavTest.list:"+favService.getAllFav("114760122369855290515GOOGLE"));
	}

	@Test
	@Transactional
	public void saveFavTest(){
		Long result=favService.saveFav(1L,"114760122369855290515GOOGLE");
		log.info("ActivityApplicationTests.saveFav.result:"+result);
		log.info("ActivityApplicationTests.saveFav.list:"+favService.getAllFav("114760122369855290515GOOGLE"));
	}
}

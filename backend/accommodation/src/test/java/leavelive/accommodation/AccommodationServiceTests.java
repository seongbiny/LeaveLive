package leavelive.accommodation;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import leavelive.accommodation.repository.AccommodationRepository;
import leavelive.accommodation.service.AccommodationService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringRunner.class)
@SpringBootTest
class AccommodationServiceTests {
	@Autowired
	AccommodationService service;

	@Autowired
	AccommodationRepository repo;

	@Test
	@Transactional
	public void saveAndGetAllAccommodationTest(){
		// db 저장
		for(int i=1; i<=10; i++){
			AccommodationArticleDto dto=new AccommodationArticleDto();
			dto.setAuthor("test"+i);
			dto.setCooking(1);
			dto.setCount(12);
			dto.setGarden(1);
			dto.setLoc("test");
			dto.setPicPath("test");
			dto.setPrice(100000);
			AccommodationArticle entity=new AccommodationArticle();
			repo.save(entity.of(dto));
		}
		Assertions.assertThat(service.getAllAccommodation().size()).isEqualTo(10);
	}

	@Test
	@Transactional
	public void getAccommodationTest(){
		saveAndGetAllAccommodationTest();
		Assertions.assertThat(service.getAccommodation(1L).getAuthor()).isEqualTo("test1");
	}
}

package leavelive.accommodation;

import leavelive.accommodation.domain.AccommodationArticle;
import leavelive.accommodation.domain.AccommodationFav;
import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import leavelive.accommodation.domain.dto.AccommodationFavDto;
import leavelive.accommodation.repository.AccommodationFavRepository;
import leavelive.accommodation.repository.AccommodationRepository;
import leavelive.accommodation.service.AccommodationFavServiceImpl;
import leavelive.accommodation.service.AccommodationService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
class AccommodationServiceTests {
	@Autowired
	AccommodationService service;

	@Autowired
	AccommodationFavServiceImpl favService;

	@Autowired
	AccommodationRepository repo;

	@Autowired
	AccommodationFavRepository favRepo;

	@Test
	@Transactional
	@DisplayName("숙소 저장")
	public void saveAccommodationTest(){
		// db 저장
		for(int i=1; i<=10; i++){
			AccommodationArticleDto dto=new AccommodationArticleDto();
//			dto.setAuthor("test"+i);
			dto.setCooking(1);
			dto.setCnt(12);
			dto.setGarden(1);
			dto.setLoc("test");
			dto.setPicPath("test");
			dto.setPrice(100000);
			dto.setName("숙소"+i);
			dto.setContents("숙소 내용"+i);
			dto.setUserId(i+"");
			service.save(dto);
		}
		Assertions.assertThat(service.getAllAccommodation().size()).isEqualTo(10);
	}

	@Test
	@Transactional
	@DisplayName("숙소 목록")
	public void getAccommodationTest(){
		saveAccommodationTest();
		Assertions.assertThat(service.getAccommodation(1L).getName()).isEqualTo("숙소1");
	}

	@Test
	@Transactional
	@DisplayName("즐겨찾기 저장")
	public void saveAccommodationFavTest(){
		saveAccommodationTest();
		for (long i=1L; i<=10L; i++) {
			favService.save(i,i+"");
		}
		Assertions.assertThat(favService.findAll().size()).isEqualTo(10);
	}

	@Test
	@Transactional
	@DisplayName("즐겨찾기 삭제")
	public void DeleteAccommodationFavTest(){
		saveAccommodationFavTest();
		favService.delete(1L);
		List<AccommodationFavDto> list = favService.findAll();
		Assertions.assertThat(favService.findAll().size()).isEqualTo(9);
	}

	@Test
	@Transactional
	@DisplayName("숙소 삭제")
	public void DeleteAccommodationTest(){
		saveAccommodationFavTest();
		service.delete(1L,"1");
		List<AccommodationArticleDto> list = service.getAllAccommodation();
		List<AccommodationFavDto> favList=favService.findAll();
		System.out.println(list);
		System.out.println(favList);
		Assertions.assertThat(list.size()).isEqualTo(9);
	}
	@Test
	@Transactional
	@DisplayName("숙소 삭제 실패")
	public void DeleteAccommodationTestFail() throws NullPointerException{
		saveAccommodationFavTest();
		try{
			service.delete(2L,"1");
			List<AccommodationArticleDto> list = service.getAllAccommodation();
			List<AccommodationFavDto> favList=favService.findAll();
			System.out.println(list);
			System.out.println(favList);
			Assertions.assertThat(list.size()).isEqualTo(9);
		}catch(NullPointerException e){
			e.printStackTrace();
			Assertions.assertThatNullPointerException();
		}
	}

	@Test
	@Transactional
	@DisplayName("숙소 수정")
	public void updateAccommodationTest(){
		saveAccommodationFavTest();
		List<AccommodationArticleDto> list = service.getAllAccommodation();
		AccommodationArticleDto dto=new AccommodationArticleDto();
		dto.setName("수정한 이름");
		dto.setCooking(1);
		service.update(dto,1L,"1");
		System.out.println("수정 결과"+service.getAccommodation(1L));
		Assertions.assertThat("수정한 이름").isEqualTo(service.getAccommodation(1L).getName());
	}
}

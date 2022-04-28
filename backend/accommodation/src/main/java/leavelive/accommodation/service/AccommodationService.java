package leavelive.accommodation.service;

import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AccommodationService {
    List<AccommodationArticleDto> getAllAccommodationByLoc(String loc);
    List<AccommodationArticleDto> getAllAccommodation();
    AccommodationArticleDto getAccommodation(Long id);
    Long delete(Long id,String userId);
    AccommodationArticleDto save(AccommodationArticleDto dto,String userId,List<MultipartFile> files);
    AccommodationArticleDto update(AccommodationArticleDto dto, Long id, String userId);
    String saveImage(List<MultipartFile> files);
    byte[] findImage(String imagePath) throws IOException;
}

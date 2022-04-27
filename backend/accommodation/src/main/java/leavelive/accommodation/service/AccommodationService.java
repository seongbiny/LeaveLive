package leavelive.accommodation.service;

import leavelive.accommodation.domain.dto.AccommodationArticleDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AccommodationService {
    List<AccommodationArticleDto> getAllAccommodation();
    AccommodationArticleDto getAccommodation(Long id);
    Long delete(Long id,String userId);
    AccommodationArticleDto save(AccommodationArticleDto dto,String userId);
    AccommodationArticleDto update(AccommodationArticleDto dto, Long id, String userId);
    AccommodationArticleDto saveImage(List<MultipartFile> files, Long id);
}

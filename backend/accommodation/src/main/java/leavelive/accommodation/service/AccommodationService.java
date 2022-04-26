package leavelive.accommodation.service;

import leavelive.accommodation.domain.dto.AccommodationArticleDto;

import java.util.List;

public interface AccommodationService {
    List<AccommodationArticleDto> getAllAccommodation();
    AccommodationArticleDto getAccommodation(Long id);
    Long delete(Long id,String userId);
    AccommodationArticleDto save(AccommodationArticleDto dto);
    AccommodationArticleDto update(AccommodationArticleDto dto, Long id, String userId);
}

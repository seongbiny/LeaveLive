package leavelive.accommodation.service;

import leavelive.accommodation.domain.dto.AccommodationArticleDto;

import java.util.List;

public interface AccommodationService {
    List<AccommodationArticleDto> getAllAccommodation();
    AccommodationArticleDto getAccommodation(Long id);
}

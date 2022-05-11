package leavelive.accommodation.service;

import leavelive.accommodation.domain.Accommodation;
import leavelive.accommodation.domain.Favorite;
import leavelive.accommodation.domain.dto.AccommodationDto;
import leavelive.accommodation.exception.FileNotFoundException;
import leavelive.accommodation.exception.MyResourceNotFoundException;
import leavelive.accommodation.repository.FavoriteRepository;
import leavelive.accommodation.repository.AccommodationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccommodationServiceImpl {
    private final AccommodationRepository repo;
    private final FavoriteRepository favRepo;

    public List<AccommodationDto> getAllAccommodationByLoc(String loc) {
        List<Accommodation> entities = repo.findAllByLocStartsWith(loc);
        return entities.stream().map(AccommodationDto::of).collect(Collectors.toList());
    }

    public List<AccommodationDto> getAllAccommodation() {
        List<Accommodation> entities = repo.findAll();
        return entities.stream().map(AccommodationDto::of).collect(Collectors.toList());
    }

    public AccommodationDto getAccommodation(Long id) {
        Optional<Accommodation> entity = repo.findById(id);
        if (!entity.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        return AccommodationDto.of(entity.get());
    }

    public Boolean delete(Long id, String userId) {
        // 내가 작성한 숙소가 맞는지 확인
        Optional<Accommodation> accommodationArticle = repo.findById(id);
        if (!accommodationArticle.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        if (!accommodationArticle.get().getUserId().equals(userId))
            throw new MyResourceNotFoundException("자신이 등록한 숙소만 삭제할 수 있습니다.");
        // 연결되어있는거 먼저 삭제
        // id를 가지고 있는 모든 favRepo 찾고, 삭제
        List<Favorite> list = favRepo.findAllByAcommodationId(id);
        if (list != null) {
            for (Favorite entity : list) favRepo.deleteById(entity.getId());
        }
        repo.deleteById(id);
        return true;
    }

    public AccommodationDto save(AccommodationDto dto, String userId, List<MultipartFile> files) {
        dto.setUserId(userId);
        Accommodation entity = new Accommodation();
        // 이미지 파일 저장
        boolean flag=false;
        for(MultipartFile image:files){
            if(!image.isEmpty()) {
                flag=true;
                break;
            }
        }
        if(flag){
            String img_path = saveImage(files);
            dto.setPicPath(img_path);
        }
        log.info("------------------dto확인"+dto);
        return AccommodationDto.of(repo.save(entity.of(dto)));
    }

    public AccommodationDto update(AccommodationDto dto, Long id, String userId, List<MultipartFile> files) {
        Optional<Accommodation> entity = repo.findById(id);
        if (!entity.isPresent()) throw new MyResourceNotFoundException("해당하는 숙소가 없습니다.");
        if (!entity.get().getUserId().equals(userId)) throw new MyResourceNotFoundException("자신이 등록한 숙소만 수정할 수 있습니다.");
        AccommodationDto oriDto = new AccommodationDto(); //저장할 내용
        oriDto = oriDto.of(entity.get()); //저장할 내용
        oriDto.setId(id);
        oriDto.setUserId(userId);
        log.info("AccommodationServiceImpl.AccommodationArticleDto.dto:"+dto);
        log.info("AccommodationServiceImpl.AccommodationArticleDto.oriDto:"+oriDto);
        oriDto=updateDto(dto,oriDto,files);
        return AccommodationDto.of(repo.save(Accommodation.updateOf(oriDto)));
    }
    public List<AccommodationDto> getAllMyAccommodation(String userId){
        List<Accommodation> entities=repo.findAllByUserId(userId);
        return entities.stream().map(AccommodationDto::of).collect(Collectors.toList());
    }

    public String saveImage(List<MultipartFile> files) {
        String images = "";
        String abPath = "/home/ubuntu/images/accommodation";
        if (files != null) {
            LocalDateTime now = LocalDateTime.now(); //현재 시간 저장
            DateTimeFormatter dateTimeFormatter =
                    DateTimeFormatter.ofPattern("yyyyMMdd");
            String current_date = now.format(dateTimeFormatter);

            File file = new File(abPath);
            if (!file.exists()) {
                boolean success = file.mkdir();
                if (!success) {
                    throw new FileNotFoundException("파일 경로를 생성하지 못했습니다.");
                }
            }
            for (MultipartFile multipartFile : files) {
                String originalFileExtension;
                String contentType = multipartFile.getContentType();
                if (ObjectUtils.isEmpty(contentType)) {
                    continue;
                }
                if (contentType.toLowerCase(Locale.ROOT).contains("image/png")) {
                    originalFileExtension = ".png";
                } else if (contentType.toLowerCase(Locale.ROOT).contains("image/jpeg")) {
                    originalFileExtension = ".jpeg";
                } else if (contentType.toLowerCase(Locale.ROOT).contains("image/jpg")) {
                    originalFileExtension = ".jpg";
                } else {
                    log.error("AccommodationServiceImpl.saveImage:이미지 파일만 올릴 수 있습니다.");
                    continue;
                }
                String new_file_name = current_date + UUID.randomUUID() + originalFileExtension;

                // 업로드 한 파일 데이터를 지정한 파일에 저장
                try {
                    file = new File(abPath + File.separator + new_file_name);
                    multipartFile.transferTo(file);
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new FileNotFoundException("이미지 저장에 실패했습니다.");
                }
                file.setWritable(true);
                file.setReadable(true);

                images += "accommodation" + File.separator + new_file_name + ",";
            }
            // 마지막 콤마는 빼기
            images = images.substring(0, images.length() - 1);
        }
        return images;
    }
    public AccommodationDto updateDto(AccommodationDto dto, AccommodationDto oriDto, List<MultipartFile> files){
        if (dto.getCnt() != 0) {
            oriDto.setCnt(dto.getCnt());
        }
        if (dto.getPrice() != 0) {
            oriDto.setPrice(dto.getPrice());
        }
        if (dto.getCooking() != null) {
            oriDto.setCooking(dto.getCooking());
        }
        if (dto.getGarden() != null) {
            oriDto.setGarden(dto.getGarden());
        }
        if (dto.getContents() != null) {
            oriDto.setContents(dto.getContents());
        }
        if (dto.getLoc() != null) {
            oriDto.setLoc(dto.getLoc());
        }
        if (dto.getName() != null) {
            oriDto.setName(dto.getName());
        }
        boolean flag=false;
        for(MultipartFile image:files){
            if(!image.isEmpty()) {
                flag=true;
                break;
            }
        }
        log.info("AccommodationServiceImpl.AccommodationArticleDto.flag:"+flag);
        if(flag){
            String picPath = saveImage(files);
            oriDto.setPicPath(picPath);
        }
        return oriDto;
    }

}

package leavelive.activity.service;

import leavelive.activity.domain.Activity;
import leavelive.activity.domain.dto.ActivityDto;
import leavelive.activity.repository.ActivityRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ActivityService {
    private final ActivityRepo repo;

    public List<ActivityDto> getAllAct(String loc) {
        List<Activity> entities = repo.findAllByLocStartsWith(loc);
        List<ActivityDto> dtos = new ArrayList<>();
        ActivityDto dto = new ActivityDto();
        for (Activity entity : entities) {
            dto = new ActivityDto();
            dtos.add(dto.of(entity));
        }
        return dtos;
    }

    public ActivityDto getAct(Long id) {
        Optional<Activity> entity = repo.findById(id);
        if (!entity.isPresent()) throw new NullPointerException("해당하는 액티비티가 없습니다.");
        ActivityDto dto = new ActivityDto();
        return dto.of(entity.get());
    }

    public Boolean delAct(Long id, String userId) {
        // userId 있는지 확인
        Optional<Activity> entity = repo.findById(id);
        if (!entity.isPresent()) throw new NullPointerException("해당하는 액티비티가 없습니다.");
        if (!entity.get().getUserId().equals(userId)) throw new NullPointerException("직접 등록한 액티비티만 삭제할 수 있습니다.");
        repo.deleteById(id);
        return true;
    }

    public ActivityDto saveAct(ActivityDto dto, List<MultipartFile> files, String userId) {
        if (files != null) dto.setPicPath(saveImage(files));
        dto.setUserId(userId);
        Activity activity = new Activity();
        Activity response = repo.save(activity.of(dto));
        return dto.of(response);
    }

    public ActivityDto updateAct(Long id, ActivityDto dto, String userId, List<MultipartFile> files) {
        Optional<Activity> entity = repo.findById(id);
        if (!entity.isPresent()) throw new NullPointerException("해당하는 액티비티가 없습니다.");
        if (!entity.get().getUserId().equals(userId)) throw new NullPointerException("직접 등록한 액티비티만 삭제할 수 있습니다.");
        // 수정 logic
        log.info("ActivityService.updateAct.dto:" + dto);
        ActivityDto ori = new ActivityDto();
        ori = ori.of(entity.get()); // 원래 정보
        if (dto.getLoc() != null) {
            ori.setLoc(dto.getLoc());
        }
        if (dto.getCnt() != 0) {
            ori.setCnt(dto.getCnt());
        }
        if (dto.getPrice() != 0) {
            ori.setPrice(dto.getPrice());
        }
        if (dto.getContents() != null) {
            ori.setContents(dto.getContents());
        }
        if (dto.getName() != null) {
            ori.setName(dto.getName());
        }
        if (files!=null){
            String picPath=saveImage(files);
            ori.setPicPath(picPath);
        }
        Activity response = repo.save(entity.get().updateOf(ori));
        return dto.of(response);
    }

    public String saveImage(List<MultipartFile> files) {
        String picPath = "";
        String abPath = "/home/ubuntu/images/activity";
        if (files != null) {
            LocalDateTime now = LocalDateTime.now(); //현재 시간 저장
            DateTimeFormatter dateTimeFormatter =
                    DateTimeFormatter.ofPattern("yyyyMMdd"); //시간 포맷 바꾸기
            String current_date = now.format(dateTimeFormatter);

            File file = new File(abPath);
            // 폴더가 존재하지 않으면
            if (!file.exists()) {
                boolean success = file.mkdir();
                if (!success) {
                    throw new NullPointerException("파일 경로를 생성하지 못했습니다.");
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
                    throw new NullPointerException("이미지 저장에 실패했습니다.");
                }
                file.setWritable(true);
                file.setReadable(true);

                picPath += "activity" + File.separator + new_file_name + ",";
            }
            // 마지막 콤마는 빼기
            picPath = picPath.substring(0, picPath.length() - 1);
        }
        return picPath;
    }

//    public byte[] findImage(String imgPath) throws IOException {
//        InputStream imageStream;
//        try {
//            imageStream = new FileInputStream(imgPath);
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new NullPointerException("해당하는 파일이 없습니다.");
//        }
//        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
//        imageStream.close();
//        return imageByteArray;
//    }
}

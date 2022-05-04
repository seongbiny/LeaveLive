package com.leavelive.diary.repository

import com.leavelive.diary.model.Diary
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface DiaryRepository : JpaRepository<Diary, Long>{

}
package com.leavelive.diary.controller

import com.leavelive.diary.service.DiaryService
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/diary")
class DiaryController (private val diaryService: DiaryService){

}
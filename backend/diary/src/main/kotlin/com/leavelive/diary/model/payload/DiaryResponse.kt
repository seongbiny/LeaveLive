package com.leavelive.diary.model.payload

import com.leavelive.diary.model.Status
import java.time.LocalDate

data class DiaryResponse(
    val diaryId:Long = 0L,
    val content: String = "",
    val status: Status = Status.PRIVATE,
    val tag: String = "",
    val date: LocalDate = LocalDate.now(),
    val picPath: String = "",
    val userId: String = ""
)
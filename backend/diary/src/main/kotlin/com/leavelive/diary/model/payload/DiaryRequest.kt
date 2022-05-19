package com.leavelive.diary.model.payload

import com.leavelive.diary.model.Status
import java.time.LocalDate

data class DiaryRequest(
    val content: String?,
    val status: Status?,
    val tag: String?,
    val date: LocalDate?,
    val picPath: String?
)
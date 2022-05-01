package com.ssafy.leavelive.business.user.model.payload

import com.fasterxml.jackson.annotation.JsonProperty
import com.ssafy.leavelive.business.user.model.Status
import com.ssafy.leavelive.business.user.model.UserType

// enum didn't go through response
data class UserResponse(
    val nickname: String = "",
    val picPath: String = "",
    val isProvider: UserType = UserType.USER,
    val isTraveling: Status = Status.NONE
)
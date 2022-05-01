package com.ssafy.leavelive.business.user.model.payload

import com.ssafy.leavelive.business.user.model.Status
import com.ssafy.leavelive.business.user.model.UserType

data class UserRequest(
    val nickname: String?,
    val picPath: String?,
    val isProvider: UserType?,
    val isTraveling: Status?
)
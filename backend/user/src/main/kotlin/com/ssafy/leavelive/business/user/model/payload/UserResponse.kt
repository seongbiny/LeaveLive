package com.ssafy.leavelive.business.user.model.payload

import com.ssafy.leavelive.business.user.model.Status
import com.ssafy.leavelive.business.user.model.UserType

// enum didn't go through response because of name of property, if property prefix is "is", object mapper will consider it as boolean value
data class UserResponse(
    val nickname: String = "",
    val picPath: String = "",
    val type: UserType = UserType.USER,
    val status: Status = Status.NONE
)
package com.ssafy.leavelive.business.user.controller

import com.ssafy.leavelive.business.user.repository.UserRepository
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/user")
class UserController (private val userRepository: UserRepository) {

}
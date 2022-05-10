package com.ssafy.leavelive.business.user.service

import com.ssafy.leavelive.business.user.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserInternalService(private val userRepository: UserRepository) {

    fun exists(userId: String): Boolean = userRepository.existsById(userId)

    fun validateRefreshToken(token: String): Boolean = userRepository.existsByToken(token)

    fun getRefreshToken(userId: String): String = userRepository.findById(userId).get().token

}
package com.ssafy.leavelive.business.user.service

import com.ssafy.leavelive.business.user.model.payload.UserResponse
import com.ssafy.leavelive.business.user.repository.UserRepository
import org.modelmapper.ModelMapper
import org.springframework.stereotype.Service

@Service
class UserInternalService(private val userRepository: UserRepository, private val modelMapper: ModelMapper) {

    fun exists(userId: String): Boolean = userRepository.existsById(userId)

    fun getUser(userId: String): UserResponse =
        modelMapper.map(userRepository.findById(userId).get(), UserResponse::class.java)

    fun validateRefreshToken(token: String): Boolean = userRepository.existsByToken(token)

    fun getRefreshToken(userId: String): String = userRepository.findById(userId).get().token

}
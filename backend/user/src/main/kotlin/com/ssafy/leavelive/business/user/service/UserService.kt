package com.ssafy.leavelive.business.user.service

import com.ssafy.leavelive.business.user.model.User
import com.ssafy.leavelive.business.user.model.payload.UserResponse
import com.ssafy.leavelive.business.user.repository.UserRepository
import org.modelmapper.ModelMapper
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.util.stream.Collector

@Service
class UserService(private val userRepository: UserRepository, private val modelMapper: ModelMapper) {

    fun getUser(userId: String): UserResponse =
        modelMapper.map(userRepository.findByIdOrNull(userId), UserResponse::class.java)

    fun getUsers(): List<UserResponse> =
        userRepository.findAll().map { e -> modelMapper.map(e, UserResponse::class.java) }.toList()

    fun saveUser(body: Map<String, Any>): UserResponse {
        return modelMapper.map(
            userRepository.save(
                User(
                    userId = body["userId"] as String,
                    nickname = "" //auto generated random nickname
                )
            ), UserResponse::class.java
        )
    }

    fun patchUser(body: Map<String, Any>) {}

    fun removeUser(userId: String) {
        userRepository.deleteById(userId)
    }

    // validate user id, whether it exists or not
    fun exists(userId: String): Boolean = userRepository.existsById(userId)
}
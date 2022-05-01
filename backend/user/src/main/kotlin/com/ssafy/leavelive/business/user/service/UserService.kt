package com.ssafy.leavelive.business.user.service

import com.auth0.jwt.JWT
import com.ssafy.leavelive.business.user.model.User
import com.ssafy.leavelive.business.user.model.payload.UserRequest
import com.ssafy.leavelive.business.user.model.payload.UserResponse
import com.ssafy.leavelive.business.user.repository.UserRepository
import org.modelmapper.ModelMapper
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository, private val modelMapper: ModelMapper) {

    fun getUser(token: String): UserResponse =
        modelMapper.map(userRepository.findByIdOrNull(decodeToken(token)), UserResponse::class.java)

    fun getUsers(): List<UserResponse> =
        userRepository.findAll().map { modelMapper.map(it, UserResponse::class.java) }.toList()

    fun saveUser(token: String, userRequest: UserRequest): UserResponse {
        val userId = decodeToken(token)
        val user = User(userId = userId, nickname = "")
        modelMapper.map(userRequest, user)

        println("${user.isProvider}, ${user.isTraveling}")

        val res = modelMapper.map(
            userRepository.save(
                user
            ), UserResponse::class.java
        )
        println("${res.isProvider}, ${res.isTraveling}")
        return res
    }

    fun patchUser(token: String, userRequest: UserRequest): UserResponse {
        val userId = decodeToken(token)
        val user = userRepository.findById(userId).get()
        modelMapper.map(userRequest, user)
        val userResponse = UserResponse()
        modelMapper.map(userRepository.save(user), userResponse)
        return userResponse
    }

    fun removeUser(userId: String) {
        userRepository.deleteById(userId)
    }

    // validate user id, whether it exists or not
    fun exists(userId: String): Boolean = userRepository.existsById(userId)

    private fun decodeToken(token: String): String = JWT.decode(token).claims["id"]!!.asString()
}
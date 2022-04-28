package com.ssafy.leavelive.business.user.service

import com.ssafy.leavelive.business.user.model.User
import com.ssafy.leavelive.business.user.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository) {
    fun getUser() {}
    fun getUsers() {}
    fun saveUser(body: Map<String, Any>): String {
        val user = User(
            userId = body["userId"] as String,
            nickname = "" //auto generated random nickname
        )
        userRepository.save(user)
        return user.userId
    }

    fun patchUser() {}
    fun removeUser() {}

    // validate user id, whether it exists or not
    fun exists(userId: String): Boolean = userRepository.existsById(userId)
}
package com.ssafy.leavelive.business.user.service

import com.ssafy.leavelive.business.user.model.User
import com.ssafy.leavelive.business.user.model.payload.UserRequest
import com.ssafy.leavelive.business.user.model.payload.UserResponse
import com.ssafy.leavelive.business.user.repository.UserRepository
import com.ssafy.leavelive.business.user.utils.JwtUtil
import org.modelmapper.ModelMapper
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import kotlin.collections.HashMap

@Service
class UserService(private val userRepository: UserRepository, private val modelMapper: ModelMapper) {

    fun getUser(token: String): UserResponse =
        modelMapper.map(userRepository.findByIdOrNull(JwtUtil.decodeToken(token)), UserResponse::class.java)

    fun getUsers(): List<UserResponse> =
        userRepository.findAll().map { modelMapper.map(it, UserResponse::class.java) }

    fun getProfileInfo(userId: String) : Map<String, String> {
        val user = userRepository.findById(userId)
        val map = HashMap<String,String>()
        user.ifPresent {
            map["nickname"] = it.nickname
            map["picPath"] = it.picPath.orEmpty()
        }
        return map
    }

    fun saveUser(token: String, userRequest: UserRequest): UserResponse {
        // extract decodeToken to token util
        val userId = JwtUtil.decodeToken(token)
        val user = User(userId = userId, nickname = "", token = "")
        modelMapper.map(userRequest, user)
        return modelMapper.map(
            userRepository.save(
                user
            ), UserResponse::class.java
        )
    }

    fun patchUser(token: String, userRequest: UserRequest): UserResponse {
        val userId = JwtUtil.decodeToken(token)
        val user = userRepository.findById(userId).get()
        modelMapper.map(userRequest, user)
        return modelMapper.map(userRepository.save(user), UserResponse::class.java)
    }

    fun uploadProfileImage(token: String, image: MultipartFile): String {
        val userId = JwtUtil.decodeToken(token)
        val user = userRepository.findById(userId).get()
        image.let {
            user.picPath = saveImage(it)
        }
        userRepository.save(user)
        return user.picPath!!
    }

    fun removeUser(token: String): Boolean {
        val userId = JwtUtil.decodeToken(token)
        userRepository.deleteById(userId)
        return true;
    }

    private fun saveImage(image: MultipartFile): String {
        var uniquePath = "${LocalDate.now().format(DateTimeFormatter.ISO_DATE)}${UUID.randomUUID()}"
        val path = "/home/ubuntu/images/profile"
        when (image.contentType?.lowercase()) {
            "image/png" -> uniquePath += ".png"
            "image/jpeg" -> uniquePath += ".jpeg"
        }
        val file = File(path)
        if (!file.exists()) file.mkdirs()
        image.transferTo(File("$path/$uniquePath"))

        return "profile/$uniquePath"
    }

}
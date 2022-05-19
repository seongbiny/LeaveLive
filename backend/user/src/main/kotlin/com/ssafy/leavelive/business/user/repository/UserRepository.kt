package com.ssafy.leavelive.business.user.repository

import com.ssafy.leavelive.business.user.model.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : JpaRepository<User, String> {
    fun existsByToken(token: String): Boolean
}
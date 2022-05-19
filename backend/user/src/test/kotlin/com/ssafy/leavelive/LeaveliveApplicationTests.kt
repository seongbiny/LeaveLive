package com.ssafy.leavelive

import com.ssafy.leavelive.business.user.model.User
import com.ssafy.leavelive.business.user.repository.UserRepository
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class LeaveliveApplicationTests {

	@Autowired
	lateinit var userRepository :UserRepository

	@Test
	fun insertTest() {
		userRepository.save(User(userId = "test"))
		assert(userRepository.existsById("test1"))
	}

}

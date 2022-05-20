package com.ssafy.authentication.utils

import java.util.*

class NicknameGenerator {
    companion object {
        val adjList =
            listOf("심심한", "귀여운", "졸린", "배고픈", "사나운", "무서운", "화가난", "코딩하는", "개발하는", "사랑스러운", "착한", "똑똑한", "부지런한", "노력하는")
        val nameList = listOf("라이언", "무지", "프로도", "네오", "제이지", "콘", "어피치", "튜브")
        fun <T> List<T>.random(): T = get(Random().nextInt(size))
    }
}
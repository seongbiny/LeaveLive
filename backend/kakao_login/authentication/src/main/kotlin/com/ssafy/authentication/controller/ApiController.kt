package com.ssafy.authentication.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin("*")
@RequestMapping("api")
class ApiController {

    // some important info request validated through filter
    @GetMapping("/something")
    fun getSomethingImportant() : ResponseEntity<Map<String, Any>> {
        val result : MutableMap<String, Any> = HashMap()
        result.put("message", "I'm an important API!")
        return ResponseEntity(result, HttpStatus.OK)
    }
}
package org.example.demo

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class GreetingApiController(val greetingService: GreetingService) {
    @GetMapping
    fun greet(@RequestParam name: String) =
        greetingService.greetPerson(name)

    @GetMapping("/greetings")
    fun getGreetCount(@RequestParam name: String): GreetingCountDto =
        GreetingCountDto(
            name = name,
            count = greetingService.getGreetingCount(name)
        )
}

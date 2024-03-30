package org.example.demo

import org.springframework.context.ApplicationContext
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.ui.set
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class GreetingController(private val greetingService: GreetingService, private val context: ApplicationContext) {
    @GetMapping("/")
    fun index(@RequestParam name: String?, model: Model): String {
        model["name"] = name
        model["greetedPeople"] = greetingService.getGreetedPeople()
        return "index"
    }
}

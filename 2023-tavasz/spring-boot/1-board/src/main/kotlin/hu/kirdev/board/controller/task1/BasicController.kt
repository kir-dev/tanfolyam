package hu.kirdev.board.controller.task1

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ResponseBody
import java.text.SimpleDateFormat

private const val APP_NAME = "kir-dev demo app"

@Controller
class BasicController {

    private val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss")

    // GET /api/name
    @ResponseBody
    @GetMapping("/api/name")
    fun test1(): String {
        return APP_NAME
    }

    // GET /api/time

    // GET /api/n

    // GET /
    @GetMapping("/")
    fun index(model: Model): String {
        return "index"
    }

}
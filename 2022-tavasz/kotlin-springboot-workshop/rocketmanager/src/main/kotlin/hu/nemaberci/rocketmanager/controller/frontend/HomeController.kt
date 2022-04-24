package hu.nemaberci.rocketmanager.controller.frontend

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@Controller
@RequestMapping(path = ["", "dashboard"])
class HomeController {

    @GetMapping(path = ["", "/"])
    fun index(model: Model): String {
        return "index"
    }

}
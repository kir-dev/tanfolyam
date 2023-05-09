package hu.kirdev.webchat.usecase.dice

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class DiceController {

    @GetMapping("/dice")
    fun diceIndex() = "dice"

}
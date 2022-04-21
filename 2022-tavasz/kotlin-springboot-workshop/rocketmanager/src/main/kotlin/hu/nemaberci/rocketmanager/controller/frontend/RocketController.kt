package hu.nemaberci.rocketmanager.controller.frontend

import hu.nemaberci.rocketmanager.input.RocketInput
import hu.nemaberci.rocketmanager.service.RocketService
import hu.nemaberci.rocketmanager.service.RocketSiloService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.validation.BindingResult
import org.springframework.web.bind.annotation.*
import java.net.http.HttpClient
import java.net.http.HttpResponse
import javax.validation.Valid

@Controller
@RequestMapping(path = ["/rockets"])
class RocketController {

    @Autowired
    lateinit var rocketService: RocketService

    @Autowired
    lateinit var siloService: RocketSiloService

    @GetMapping(path = ["/", ""])
    fun listAllRockets(model: Model): String {
        model.addAttribute("rockets", rocketService.listAllRockets())
        return "rocket/rockets";
    }

    @GetMapping(path = ["/{id}"])
    fun getRocket(model: Model,
                  @PathVariable id: Long): String {
        model.addAttribute("rocket", rocketService.getRocket(id))
        model.addAttribute("silos", siloService.listAllRocketSilos())
        return "rocket/rocket"
    }

    @GetMapping(path = ["/new"])
    fun newRocket(model: Model): String {
        model.addAttribute("silos", siloService.listAllRocketSilos())
        return "rocket/rocket"
    }

}
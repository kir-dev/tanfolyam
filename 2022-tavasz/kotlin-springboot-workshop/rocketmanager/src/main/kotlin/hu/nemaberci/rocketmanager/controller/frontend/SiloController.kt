package hu.nemaberci.rocketmanager.controller.frontend

import hu.nemaberci.rocketmanager.service.CityService
import hu.nemaberci.rocketmanager.service.RocketService
import hu.nemaberci.rocketmanager.service.RocketSiloService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/silos")
@Controller
class SiloController {

    @Autowired
    lateinit var rocketSiloService: RocketSiloService

    @Autowired
    lateinit var cityService: CityService

    @GetMapping(path = ["/", ""])
    fun listAllSilos(model: Model): String {
        model.addAttribute("silos", rocketSiloService.listAllRocketSilos())
        return "silo/silos"
    }

    @GetMapping(path = ["/{id}"])
    fun getSilo(model: Model,
                  @PathVariable id: Long): String {
        model.addAttribute("silo", rocketSiloService.getRocketSiloById(id))
        model.addAttribute("cities", cityService.listAllCities())
        return "silo/silo"
    }

    @GetMapping(path = ["/new"])
    fun newSilo(model: Model): String {
        model.addAttribute("cities", cityService.listAllCities())
        return "silo/silo"
    }

}
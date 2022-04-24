package hu.nemaberci.rocketmanager.controller.frontend

import hu.nemaberci.rocketmanager.dto.CityStats
import hu.nemaberci.rocketmanager.service.CityService
import hu.nemaberci.rocketmanager.service.RocketService
import hu.nemaberci.rocketmanager.service.RocketSiloService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/stats")
@Controller
class StatsController {

    @Autowired
    private lateinit var cityService: CityService

    @Autowired
    private lateinit var rocketSiloService: RocketSiloService

    @Autowired
    private lateinit var rocketService: RocketService

    @GetMapping(path = ["/", ""])
    fun getDefaultStats(model: Model): String {
        model.addAttribute(
                "cityStats",
                cityService.listAllCities().map {
                    CityStats(
                            name = it.name,
                            siloCapacity = rocketSiloService.getByCityId(it.id)
                                    .sumOf { rocketSilo -> rocketSilo.capacity },
                            rocketCount = rocketService.getByCityId(it.id)
                                    .count()
                    )
                }
        )
        return "stats/stats"
    }

}
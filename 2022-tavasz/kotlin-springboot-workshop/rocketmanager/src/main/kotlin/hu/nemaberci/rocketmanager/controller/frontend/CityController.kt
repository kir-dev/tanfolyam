package hu.nemaberci.rocketmanager.controller.frontend

import hu.nemaberci.rocketmanager.service.CityService
import hu.nemaberci.rocketmanager.service.CountryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping

@RequestMapping("/cities")
@Controller
class CityController {

    @Autowired
    lateinit var cityService: CityService

    @Autowired
    lateinit var countryService: CountryService

    @GetMapping(path = ["/", ""])
    fun listAllCities(model: Model): String {
        model.addAttribute("cities", cityService.listAllCities())
        return "city/cities"
    }

    @GetMapping(path = ["/{id}"])
    fun getCity(model: Model,
                @PathVariable id: Long): String {
        model.addAttribute("city", cityService.listAllCities())
        model.addAttribute("countries", countryService.listAllCountries())
        return "city/city"
    }

    @GetMapping(path = ["/new"])
    fun newRocket(model: Model): String {
        model.addAttribute("countries", countryService.listAllCountries())
        return "city/city"
    }

}
package hu.nemaberci.rocketmanager.seed

import hu.nemaberci.rocketmanager.entity.CityEntity
import hu.nemaberci.rocketmanager.entity.CountryEntity
import hu.nemaberci.rocketmanager.entity.RocketSiloEntity
import hu.nemaberci.rocketmanager.enum.RocketConeShape
import hu.nemaberci.rocketmanager.input.CityInput
import hu.nemaberci.rocketmanager.input.CountryInput
import hu.nemaberci.rocketmanager.input.RocketInput
import hu.nemaberci.rocketmanager.input.RocketSiloInput
import hu.nemaberci.rocketmanager.service.CityService
import hu.nemaberci.rocketmanager.service.CountryService
import hu.nemaberci.rocketmanager.service.RocketService
import hu.nemaberci.rocketmanager.service.RocketSiloService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import javax.annotation.PostConstruct
import kotlin.random.Random

@Component
@Profile("seed")
class SeedAll {

    @Autowired
    lateinit var countryService: CountryService

    @Autowired
    lateinit var cityService: CityService

    @Autowired
    lateinit var rocketSiloService: RocketSiloService

    @Autowired
    lateinit var rocketService: RocketService

    @PostConstruct
    fun seed(): Unit {

        if (countryService.listAllCountries().size >= 2) {
            return;
        }

        var cities = mutableListOf<CityEntity>()
        var countries = mutableListOf<CountryEntity>()
        var silos = mutableListOf<RocketSiloEntity>()

        countries.add(countryService.createCountry(
                CountryInput(
                        name = "Hungary",
                        code = "HU"
                )
        ))

        countries.add(countryService.createCountry(
                CountryInput(
                        name = "England",
                        code = "EN"
                )
        ))

        for (i in (0..10)) {
            cities.add(
                    cityService.createCity(
                            CityInput(
                                    name = "City-" + Random.nextInt(10000, 100000),
                                    countryId = countries.random().id
                            )
                    )
            )
        }

        for (i in (1 .. 100)) {
            silos.add(
                    rocketSiloService.createRocketSilo(
                            RocketSiloInput(
                                    capacity = Random.nextInt(100, 1000),
                                    cityId = cities.random().id,
                                    identifier = "Silo-${Random.nextInt(10000, 100000)}"
                            )
                    )
            )
        }

        for (i in (1 .. 1000)) {
            rocketService.createRocket(
                    RocketInput(
                            coneShape = if (Random.nextBoolean()) "Rounded" else "Pointy",
                            radius = Random.nextInt(0, 50000),
                            siloId = silos.random().id
                    )
            )
        }

        rocketSiloService.createRocketSilo(
                RocketSiloInput(
                        capacity = 1,
                        cityId = cities.random().id,
                        identifier = "Silo-Capacity-1"
                )
        )

    }

}
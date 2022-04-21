package hu.nemaberci.rocketmanager.service

import hu.nemaberci.rocketmanager.dto.City
import hu.nemaberci.rocketmanager.dto.RocketSilo
import hu.nemaberci.rocketmanager.entity.CityEntity
import hu.nemaberci.rocketmanager.entity.RocketSiloEntity
import hu.nemaberci.rocketmanager.exception.EntityByIdNotExistsException
import hu.nemaberci.rocketmanager.input.CityInput
import hu.nemaberci.rocketmanager.repository.CityRepository
import hu.nemaberci.rocketmanager.repository.CountryRepository
import hu.nemaberci.rocketmanager.repository.RocketSiloRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
// todo: does not use dto
class CityService {

    @Autowired
    lateinit var cityRepository: CityRepository

    @Autowired
    lateinit var siloRepository: RocketSiloRepository

    @Autowired
    lateinit var countryRepository: CountryRepository

    fun createCity(cityInput: CityInput): CityEntity {
        val newCityEntity = copyEntityDataFromInput(cityInput)
        return cityRepository.save(newCityEntity)
    }

    fun listAllCities(): List<City> = cityRepository.findAll().map(City::from)

    fun updateCity(id: Long, cityInput: CityInput): CityEntity {
        val optionalCityEntity = cityRepository.findById(id)
        val cityEntity =
                optionalCityEntity.orElseThrow { EntityByIdNotExistsException("CityEntity", id) }
        copyEntityDataFromInput(cityInput, cityEntity)
        return cityRepository.save(cityEntity)
    }

    private fun copyEntityDataFromInput(cityInput: CityInput, cityEntity: CityEntity? = null): CityEntity {
        val actualCityEntity = cityEntity ?: CityEntity()
        actualCityEntity.name = cityInput.name
        cityInput.countryId?.let {
            actualCityEntity.country = countryRepository.findById(it).orElseThrow {
                IllegalArgumentException("lang.error.country_not_exists")
            }
        }
        cityInput.rocketSiloIds?.let {
            val rocketSilos: MutableList<RocketSiloEntity> = mutableListOf()
            it.forEach { rocketSiloId ->
                rocketSilos.add(siloRepository.findById(rocketSiloId).orElseThrow {
                    IllegalArgumentException("lang.error.silo_not_exists")
                })
            }
            actualCityEntity.rocketSilos = rocketSilos
        }
        return actualCityEntity
    }

    fun getCityById(id: Long): City = City.from(
            cityRepository.findById(id)
                    .orElseThrow { EntityByIdNotExistsException("CityEntity", id) }
    )

}
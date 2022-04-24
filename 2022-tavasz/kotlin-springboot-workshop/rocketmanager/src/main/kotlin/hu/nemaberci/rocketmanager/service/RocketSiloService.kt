package hu.nemaberci.rocketmanager.service

import hu.nemaberci.rocketmanager.dto.RocketSilo
import hu.nemaberci.rocketmanager.entity.RocketEntity
import hu.nemaberci.rocketmanager.entity.RocketSiloEntity
import hu.nemaberci.rocketmanager.exception.EntityByIdNotExistsException
import hu.nemaberci.rocketmanager.input.RocketSiloInput
import hu.nemaberci.rocketmanager.repository.CityRepository
import hu.nemaberci.rocketmanager.repository.RocketSiloRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
// todo: does not use dto
class RocketSiloService {

    @Autowired
    lateinit var rocketSiloRepository: RocketSiloRepository

    @Autowired
    lateinit var cityRepository: CityRepository

    fun listAllRocketSilos(): List<RocketSilo> = rocketSiloRepository.findAll().map(RocketSilo::from)

    fun createRocketSilo(rocketSiloInput: RocketSiloInput): RocketSiloEntity {
        val newRocketSilo = RocketSiloEntity()
        newRocketSilo.capacity = rocketSiloInput.capacity
        newRocketSilo.identifier = rocketSiloInput.identifier
        rocketSiloInput.cityId?.let {
            newRocketSilo.city = cityRepository.findById(it).orElseThrow {
                IllegalArgumentException("lang.error.city_not_exists")
            }
        }
        return rocketSiloRepository.save(newRocketSilo)
    }

    fun updateRocketSilo(id: Long, rocketSiloInput: RocketSiloInput): RocketSiloEntity {
        val optionalRocketSilo: Optional<RocketSiloEntity> = rocketSiloRepository.findById(id)
        val rocketSilo = optionalRocketSilo.orElseThrow {
            EntityByIdNotExistsException("RocketSiloEntity", id)
        }
        rocketSilo.capacity = rocketSiloInput.capacity
        rocketSilo.identifier = rocketSiloInput.identifier
        rocketSiloInput.cityId?.let {
            rocketSilo.city = cityRepository.findById(it).orElseThrow {
                IllegalArgumentException("lang.error.city_not_exists")
            }
        }
        return rocketSiloRepository.save(rocketSilo)
    }

    fun getRocketSiloById(id: Long): RocketSilo = RocketSilo.from(
            rocketSiloRepository.findById(id)
                    .orElseThrow { EntityByIdNotExistsException("RocketSiloEntity", id) }
    )

    fun getByCityId(id: Long): List<RocketSilo> = rocketSiloRepository.getAllByCity_Id(id)
            .map(RocketSilo::from)

}
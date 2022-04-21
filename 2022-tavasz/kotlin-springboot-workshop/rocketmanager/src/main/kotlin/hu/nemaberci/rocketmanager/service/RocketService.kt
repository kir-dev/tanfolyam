package hu.nemaberci.rocketmanager.service

import hu.nemaberci.rocketmanager.dto.Rocket
import hu.nemaberci.rocketmanager.entity.RocketEntity
import hu.nemaberci.rocketmanager.enum.RocketConeShape
import hu.nemaberci.rocketmanager.exception.EntityByIdNotExistsException
import hu.nemaberci.rocketmanager.exception.SiloFullException
import hu.nemaberci.rocketmanager.input.RocketInput
import hu.nemaberci.rocketmanager.repository.RocketRepository
import hu.nemaberci.rocketmanager.repository.RocketSiloRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class RocketService {

    @Autowired
    lateinit var rocketRepository: RocketRepository

    @Autowired
    lateinit var rocketSiloRepository: RocketSiloRepository

    fun listAllRockets(): List<Rocket> {
        return rocketRepository.findAll().map(Rocket::from)
    }

    fun createRocket(rocketInput: RocketInput): Rocket =
        Rocket.from(
                rocketRepository.save(copyEntityDataFromInput(rocketInput))
        )

    fun getRocket(id: Long): Rocket {
        return Rocket.from(
                rocketRepository.findById(id).orElseThrow { EntityByIdNotExistsException("RocketEntity", id) }
        )
    }

    private fun copyEntityDataFromInput(rocketInput: RocketInput, newRocketEntity: RocketEntity? = null): RocketEntity {
        val actualRocketEntity = newRocketEntity ?: RocketEntity()
        actualRocketEntity.coneShape = RocketConeShape.valueOf(rocketInput.coneShape.uppercase())
        actualRocketEntity.radius = rocketInput.radius

        /**
         * Silo ID is optional, so we only process it if it is present.
         * */
        rocketInput.siloId?.let {
            // todo: check if silo can contain current rocket
            actualRocketEntity.silo =
                rocketSiloRepository.findById(it).orElseThrow { IllegalArgumentException("") }
        }
        return actualRocketEntity
    }

    fun updateRocket(id: Long, rocketInput: RocketInput): Rocket {
        val optionalRocketEntity: Optional<RocketEntity> = rocketRepository.findById(id)
        val rocketEntity = copyEntityDataFromInput(
                rocketInput,
                optionalRocketEntity.orElseThrow { EntityByIdNotExistsException("RocketEntity", id) }
        )
        return Rocket.from(
                rocketRepository.save(rocketEntity)
        )
    }

    fun getByCityId(id: Long) = rocketRepository.getAllBySilo_City_Id(id)
            .map(Rocket::from)

}
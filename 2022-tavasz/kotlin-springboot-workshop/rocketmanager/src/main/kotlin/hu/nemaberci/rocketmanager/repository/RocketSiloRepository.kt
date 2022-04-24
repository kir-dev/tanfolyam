package hu.nemaberci.rocketmanager.repository

import hu.nemaberci.rocketmanager.entity.RocketSiloEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface RocketSiloRepository: JpaRepository<RocketSiloEntity, Long> {
    fun getAllByCity_Id(cityId: Long): List<RocketSiloEntity>
}
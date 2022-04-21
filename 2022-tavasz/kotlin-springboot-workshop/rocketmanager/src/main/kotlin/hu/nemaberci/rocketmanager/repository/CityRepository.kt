package hu.nemaberci.rocketmanager.repository

import hu.nemaberci.rocketmanager.entity.CityEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CityRepository: JpaRepository<CityEntity, Long> {}
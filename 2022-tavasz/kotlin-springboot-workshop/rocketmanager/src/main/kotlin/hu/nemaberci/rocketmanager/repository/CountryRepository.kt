package hu.nemaberci.rocketmanager.repository

import hu.nemaberci.rocketmanager.entity.CountryEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface CountryRepository : JpaRepository<CountryEntity, Long> {}
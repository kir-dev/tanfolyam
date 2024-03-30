package org.example.demo

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface GreetingRepository : JpaRepository<GreetingEntity, Int> {
    fun countByNameIgnoreCase(name: String): Long

    @Query("select distinct g.name from GreetingEntity g")
    fun findDistinctNames(): List<String>
}

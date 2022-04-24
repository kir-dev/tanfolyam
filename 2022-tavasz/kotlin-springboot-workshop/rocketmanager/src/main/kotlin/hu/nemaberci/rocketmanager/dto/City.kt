package hu.nemaberci.rocketmanager.dto

import hu.nemaberci.rocketmanager.entity.CityEntity

data class City(
        val id: Long,
        val name: String,
        val country: Country
) {
    companion object {
        fun from(cityEntity: CityEntity): City {
            return City(
                    cityEntity.id,
                    cityEntity.name,
                    Country.from(cityEntity.country)
            )
        }
    }
}
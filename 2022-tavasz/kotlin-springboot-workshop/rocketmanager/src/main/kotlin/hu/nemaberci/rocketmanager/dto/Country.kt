package hu.nemaberci.rocketmanager.dto

import hu.nemaberci.rocketmanager.entity.CountryEntity

data class Country(
        val id: Long,
        val name: String,
        val code: String
) {
    companion object {
        fun from(countryEntity: CountryEntity): Country {
            return Country(
                    countryEntity.id,
                    countryEntity.name,
                    countryEntity.code
            )
        }
    }


}
package hu.nemaberci.rocketmanager.input

import javax.validation.constraints.Size

data class CityInput(
    @field:Size(min = 1, max = 255)
    val name: String,
    val countryId: Long? = null,
    val rocketSiloIds: List<Long>? = null
)
package hu.nemaberci.rocketmanager.input

import org.springframework.validation.annotation.Validated
import javax.validation.constraints.Max
import javax.validation.constraints.Min
import javax.validation.constraints.Size

data class RocketSiloInput(
        @field:Min(0)
        @field:Max(1000)
        val capacity: Int,
        @field:Size(min = 3, max = 255)
        val identifier: String,
        val cityId: Long? = null
)
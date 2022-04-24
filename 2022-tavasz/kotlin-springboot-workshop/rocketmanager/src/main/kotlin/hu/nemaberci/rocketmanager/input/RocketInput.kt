package hu.nemaberci.rocketmanager.input

import javax.validation.constraints.Max
import javax.validation.constraints.Min
import javax.validation.constraints.Pattern

data class RocketInput(
        // see https://stackoverflow.com/questions/35847763/kotlin-data-class-bean-validation-jsr-303
        @field:Pattern(regexp = "(Pointy)|(Rounded)")
        val coneShape: String,

        @field:Min(0)
        @field:Max(50000)
        val radius: Int,

        val siloId: Long? = null
)
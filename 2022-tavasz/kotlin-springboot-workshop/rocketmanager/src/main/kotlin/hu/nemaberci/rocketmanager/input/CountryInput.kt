package hu.nemaberci.rocketmanager.input

import org.springframework.validation.annotation.Validated
import javax.validation.constraints.Max
import javax.validation.constraints.Min
import javax.validation.constraints.Pattern

data class CountryInput (
        @field:Min(1)
        @field:Max(255)
        val name: String,
        @field:Min(1)
        @field:Max(3)
        val code: String
)
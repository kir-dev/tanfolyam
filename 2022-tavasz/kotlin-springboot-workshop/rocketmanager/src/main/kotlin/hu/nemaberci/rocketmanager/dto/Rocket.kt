package hu.nemaberci.rocketmanager.dto

import hu.nemaberci.rocketmanager.entity.RocketEntity
import hu.nemaberci.rocketmanager.enum.RocketConeShape

data class Rocket(
        val id: Long,
        val coneShape: RocketConeShape,
        val radius: Int,
        val silo: RocketSilo? = null
) {
    companion object {
        fun from(rocketEntity: RocketEntity): Rocket {
            return Rocket(
                    rocketEntity.id,
                    rocketEntity.coneShape,
                    rocketEntity.radius,
                    rocketEntity.silo?.let { RocketSilo.from(it) }
            )
        }
    }
}

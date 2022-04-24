package hu.nemaberci.rocketmanager.dto

import hu.nemaberci.rocketmanager.entity.RocketSiloEntity

data class RocketSilo(
        val id: Long,
        val city: City,
        val capacity: Int,
        val identifier: String
) {
    companion object {
        fun from(rocketSiloEntity: RocketSiloEntity): RocketSilo {
            return RocketSilo(
                    rocketSiloEntity.id,
                    City.from(rocketSiloEntity.city),
                    rocketSiloEntity.capacity,
                    rocketSiloEntity.identifier
            )
        }
    }
}

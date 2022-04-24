package hu.nemaberci.rocketmanager.entity

import hu.nemaberci.rocketmanager.enum.RocketConeShape
import javax.persistence.*

@Entity
class RocketEntity {

    @Id
    @GeneratedValue
    var id: Long = 0

    @Column
    var coneShape: RocketConeShape = RocketConeShape.ROUNDED

    @ManyToOne
    var silo: RocketSiloEntity? = null

    @Column
    var radius: Int = 0
}
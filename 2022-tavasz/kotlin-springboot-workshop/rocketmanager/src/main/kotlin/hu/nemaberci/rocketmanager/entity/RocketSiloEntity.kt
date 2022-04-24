package hu.nemaberci.rocketmanager.entity

import javax.persistence.*

@Entity
class RocketSiloEntity {
    @Id
    @GeneratedValue
    var id: Long = 0

    @ManyToOne
    lateinit var city: CityEntity

    @Column
    var capacity: Int = 0

    @Column
    var identifier: String = ""

    @OneToMany(mappedBy = "silo")
    lateinit var rockets: List<RocketEntity>
}
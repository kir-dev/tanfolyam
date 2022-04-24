package hu.nemaberci.rocketmanager.entity

import javax.persistence.*

@Entity
class CityEntity {
    @Id
    @GeneratedValue
    var id: Long = 0

    @Column
    var name: String = ""

    @ManyToOne
    lateinit var country: CountryEntity

    @OneToMany(mappedBy = "city")
    lateinit var rocketSilos: List<RocketSiloEntity>
}
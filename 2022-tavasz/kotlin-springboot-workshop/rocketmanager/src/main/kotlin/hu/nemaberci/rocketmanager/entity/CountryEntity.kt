package hu.nemaberci.rocketmanager.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
class CountryEntity {
    @Id
    @GeneratedValue
    var id: Long = 0

    @Column
    var name: String = ""

    @Column
    var code: String = ""
}
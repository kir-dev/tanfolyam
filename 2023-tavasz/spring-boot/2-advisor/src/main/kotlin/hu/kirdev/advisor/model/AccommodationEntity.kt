package hu.kirdev.advisor.model

import com.fasterxml.jackson.annotation.JsonManagedReference
import jakarta.persistence.*
import org.hibernate.Hibernate

@Entity
@Table(name = "accommodation")
data class AccommodationEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @Column(nullable = false)
    var name: String = "",

    @Column(nullable = false)
    var address: String = "",

    @Column(nullable = false)
    var description: String = "",

    @Column
    var imageUrl: String? = "",

    @OneToMany(mappedBy = "accommodation", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    @JsonManagedReference
    var ratings: MutableList<RatingEntity> = mutableListOf()
) {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as AccommodationEntity

        return id != 0L && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String {
        return "AccommodationEntity(id=$id, name='$name', address='$address', description='$description', imageUrl=$imageUrl, ratings=$ratings)"
    }

}

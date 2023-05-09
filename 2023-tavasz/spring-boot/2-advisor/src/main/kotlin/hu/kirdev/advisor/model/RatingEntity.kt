package hu.kirdev.advisor.model

import com.fasterxml.jackson.annotation.JsonBackReference
import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.hibernate.Hibernate

@Entity
@Table(name = "rating")
data class RatingEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    var id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "accommodation_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    var accommodation: AccommodationEntity? = null,

    @Column(nullable = false)
    var userId: String = "",

    @Column(nullable = false)
    var userName: String = "",

    @Column(nullable = false)
    var comment: String = "",

    @Column(nullable = false)
    var rating: Int = 0
) {

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as RatingEntity

        return id != 0L && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    override fun toString(): String {
        return "RatingEntity(id=$id, accommodation=$accommodation, userId=$userId, userName='$userName', comment='$comment', rating=$rating)"
    }

}
package hu.kirdev.webshop.model

import jakarta.persistence.*
import org.hibernate.Hibernate

@Entity
@Table(name = "purchases")
data class PurchaseEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @Column(nullable = false, name = "user_id")
    var userId: Long = 0,

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    var product: ProductEntity? = null,

    @Column(nullable = false)
    var used: Boolean = false

) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as PurchaseEntity

        return id != 0L && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(id = $id )"
    }
}

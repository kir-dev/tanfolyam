package hu.kirdev.webshop.model

import jakarta.persistence.*
import org.hibernate.Hibernate

@Entity
@Table(name = "items")
data class ItemEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    var product: ProductEntity? = null,

    @Column(nullable = false, name = "display_name")
    var displayName: String = "",

    @Column(nullable = false)
    var type: String = "",

    @Column(nullable = false)
    var amount: Int = 0,

) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as ItemEntity

        return id != 0L && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(id = $id )"
    }

}
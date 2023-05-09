package hu.kirdev.webshop.model

import jakarta.persistence.*
import org.hibernate.Hibernate

@Entity
@Table(name = "products")
data class ProductEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @Column(nullable = false)
    var name: String = "",

    @Lob
    @Column(nullable = false)
    var description: String = "",

    @OneToMany(mappedBy = "product", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    var items: MutableList<ItemEntity> = mutableListOf(),

    @Column(nullable = false)
    var price: Int = 0

) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as ProductEntity

        return id != 0L && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(id = $id )"
    }
}
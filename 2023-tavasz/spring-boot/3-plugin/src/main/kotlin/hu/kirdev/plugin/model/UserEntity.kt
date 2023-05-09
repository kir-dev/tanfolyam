package hu.kirdev.webshop.model

import jakarta.persistence.*
import org.hibernate.Hibernate

@Entity
@Table(name = "users")
data class UserEntity(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @Column(nullable = false, name = "internal_id")
    var internalId: String = "",

    @Column(nullable = false, name = "minecraft_username")
    var minecraftUsername: String = "",

    @Column(nullable = false)
    var money: Int = 0,

) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as UserEntity

        return id != 0L && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(id = $id )"
    }
}

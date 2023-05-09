package hu.kirdev.webshop.repo

import hu.kirdev.webshop.model.ItemEntity
import hu.kirdev.webshop.model.ProductEntity
import hu.kirdev.webshop.model.PurchaseEntity
import hu.kirdev.webshop.model.UserEntity
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface ProductRepo : CrudRepository<ProductEntity, Long> {

}

@Repository
interface ItemRepo : CrudRepository<ItemEntity, Long> {

}

@Repository
interface PurchaseRepo : CrudRepository<PurchaseEntity, Long> {

    fun findAllByUserId(userId: Long): List<PurchaseEntity>

}

@Repository
interface UserRepo : CrudRepository<UserEntity, Long> {

    fun findByInternalId(internalId: String): Optional<UserEntity>

}

package hu.kirdev.webshop.service

import hu.kirdev.webshop.model.ItemEntity
import hu.kirdev.webshop.model.ProductEntity
import hu.kirdev.webshop.model.PurchaseEntity
import hu.kirdev.webshop.repo.ItemRepo
import hu.kirdev.webshop.repo.ProductRepo
import hu.kirdev.webshop.repo.PurchaseRepo
import hu.kirdev.webshop.repo.UserRepo
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Isolation
import org.springframework.transaction.annotation.Transactional

@Service
open class WebshopService(
    private val productRepo: ProductRepo,
    private val itemRepo: ItemRepo,
    private val purchaseRepo: PurchaseRepo,
    private val userRepo: UserRepo
) {

    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    open fun getAllProducts(): List<ProductEntity> {
        return productRepo.findAll().toList()
    }

    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    open fun getPurchasesByUser(id: Long): List<PurchaseEntity> {
        return purchaseRepo.findAllByUserId(id)
    }

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED)
    open fun createProduct(productEntity: ProductEntity, items: List<ItemEntity>) {
        productRepo.save(productEntity)
        productEntity.items.addAll(items)
        items.forEach { item -> item.product = productEntity }
        itemRepo.saveAll(items)
    }

    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    open fun hasProducts(): Boolean {
        return productRepo.count() > 0
    }

    enum class PurchaseStatus(
        val success: Boolean = false,
        val message: String = ""
    ) {
        UNKNOWN_USER(message = "Invalid user"),
        UNKNOWN_PRODUCT(message = "Invalid product"),
        NOT_ENOUGH_MONEY(message = "You don't have enough money!"),
        OK(success = true, message = "Item purchased successfully!")
    }

    @Transactional(readOnly = false, isolation = Isolation.SERIALIZABLE)
    open fun buyProduct(userId: Long, productId: Long): PurchaseStatus {
        val user = userRepo.findById(userId).orElse(null)
            ?: return PurchaseStatus.UNKNOWN_USER

        val product = productRepo.findById(productId).orElse(null)
            ?: return PurchaseStatus.UNKNOWN_PRODUCT

        if (user.money < product.price)
            return PurchaseStatus.NOT_ENOUGH_MONEY

        user.money -= product.price

        userRepo.save(user)
        purchaseRepo.save(PurchaseEntity(
            product = product,
            userId = userId,
            used = false
        ))
        return PurchaseStatus.OK
    }


}
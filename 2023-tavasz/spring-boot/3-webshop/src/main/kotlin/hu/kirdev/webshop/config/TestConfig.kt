package hu.kirdev.webshop.config

import hu.kirdev.webshop.model.ItemEntity
import hu.kirdev.webshop.model.ProductEntity
import hu.kirdev.webshop.service.WebshopService
import jakarta.annotation.PostConstruct
import org.springframework.context.annotation.Configuration

@Configuration
class TestConfig(
    private val webshopService: WebshopService
) {

    @PostConstruct
    fun createKits() {
        println(webshopService.javaClass.name)

        if (webshopService.hasProducts())
            return

        webshopService.createProduct(
            ProductEntity(
                name = "Diamond Kit",
                description = "Diamond sword and 64 diamonds",
                price = 2000
            ),
            listOf(
                ItemEntity(
                    displayName = "My Sword",
                    amount = 1,
                    type = "DIAMOND_SWORD",
                ),
                ItemEntity(
                    displayName = "My Diamond",
                    amount = 64,
                    type = "DIAMOND",
                )
            )
        )

        webshopService.createProduct(
            ProductEntity(
                name = "Golden Apple Kit",
                description = "Gold, apple, golden apple",
                price = 1000
            ),
            listOf(
                ItemEntity(
                    displayName = "Gold",
                    amount = 9,
                    type = "GOLD_INGOT",
                ),
                ItemEntity(
                    displayName = "Just an apple",
                    amount = 1,
                    type = "APPLE",
                ),
                ItemEntity(
                    displayName = "Golden apple",
                    amount = 1,
                    type = "GOLDEN_APPLE",
                )
            )
        )
    }

}
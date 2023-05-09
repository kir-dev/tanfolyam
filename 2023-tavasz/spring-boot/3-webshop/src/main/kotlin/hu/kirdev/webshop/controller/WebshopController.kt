package hu.kirdev.webshop.controller

import hu.kirdev.webshop.service.WebshopService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping

@Controller
class WebshopController(
    private val webshopService: WebshopService
) {

    @GetMapping("/user/webshop")
    fun products(model: Model): String {
        model.addAttribute("loggedIn", true)
        model.addAttribute("products", webshopService.getAllProducts())
        return "webshop"
    }

    @PostMapping("/buy/{productId}")
    fun buy(
        model: Model,
        @PathVariable productId: Long,
        @AuthenticationPrincipal principal: OAuth2User?
    ): String {

        val userId = principal!!.attributes["userId"] as Long
        val purchase = webshopService.buyProduct(userId, productId)

        model.addAttribute("message", purchase.message)

        model.addAttribute("loggedIn", true)
        model.addAttribute("products", webshopService.getAllProducts())
        return "webshop"
    }

    @GetMapping("/user/inventory")
    fun inventory(
        model: Model,
        @AuthenticationPrincipal principal: OAuth2User?
    ): String {
        val userId = principal!!.attributes["userId"] as Long
        model.addAttribute("loggedIn", true)
        model.addAttribute("inventory", webshopService.getPurchasesByUser(userId))
        return "inventory"
    }

}
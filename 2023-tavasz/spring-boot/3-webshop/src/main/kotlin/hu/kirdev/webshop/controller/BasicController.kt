package hu.kirdev.webshop.controller

import hu.kirdev.webshop.authsch.ProfileResponse
import hu.kirdev.webshop.dto.SettingsDto
import hu.kirdev.webshop.service.UserService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping

@Controller
class BasicController(
    private val userService: UserService
) {

    @GetMapping("/")
    fun index(model: Model, @AuthenticationPrincipal principal: OAuth2User?): String {
        if (principal != null) {
            val profileResponse = principal.attributes["profile"] as ProfileResponse
            model.addAttribute("name", "${profileResponse.surname} ${profileResponse.givenName}")
            model.addAttribute("loggedIn", true)
        }
        return "index"
    }

    @GetMapping("/login/authsch")
    fun login(): String {
        return "redirect:/oauth2/authorization/authsch"
    }

    @GetMapping("/user/profile")
    fun profile(model: Model, @AuthenticationPrincipal principal: OAuth2User?): String {
        if (principal == null)
            return "profile"

        val userId = principal.attributes["userId"] as Long

        val user = userService.getUserById(userId)
        model.addAttribute("loggedIn", true)
        model.addAttribute("user", user)
        model.addAttribute("settings", SettingsDto(user.minecraftUsername))
        return "profile"
    }

    @PostMapping("/user/profile")
    fun changeSettings(settings: SettingsDto, @AuthenticationPrincipal principal: OAuth2User?): String {
        if (principal == null)
            return "/"

        val userId = principal.attributes["userId"] as Long
        userService.setUsername(userId, settings.username)
        return "redirect:/user/profile"
    }

}

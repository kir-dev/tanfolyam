package hu.kirdev.authschbase.controller

import hu.kirdev.authschbase.authsch.ProfileResponse
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class ExampleController {

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
        val profileResponse = principal.attributes["profile"] as ProfileResponse

        model.addAttribute("loggedIn", true)
        model.addAttribute("id", profileResponse.internalId)
        model.addAttribute("name", "${profileResponse.surname} ${profileResponse.givenName}")
        model.addAttribute("email", profileResponse.email)
        return "profile"
    }

}
package hu.kirdev.advisor.controller

import hu.kirdev.advisor.authsch.ProfileResponse
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping

@Controller
class ProfileController {

    @GetMapping("/user/profile")
    fun profile(model: Model, @AuthenticationPrincipal principal: OAuth2User?): String {
        if (principal == null)
            return "profile"
        val profileResponse = principal.attributes["profile"] as ProfileResponse

        model.addAttribute("user", profileResponse)
        return "profile"
    }

}
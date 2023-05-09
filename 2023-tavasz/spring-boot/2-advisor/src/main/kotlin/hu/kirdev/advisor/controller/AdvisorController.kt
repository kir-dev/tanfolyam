package hu.kirdev.advisor.controller

import hu.kirdev.advisor.model.AccommodationEntity
import hu.kirdev.advisor.model.RatingEntity
import hu.kirdev.advisor.service.AdvisorService
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.core.user.OAuth2User
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping


@Controller
class AdvisorController(
    private val advisorService: AdvisorService
) {

    @GetMapping("/accommodations")
    fun accommodations(model: Model, @AuthenticationPrincipal principal: OAuth2User?): String {
        handlePrincipal(principal, model)

        // TODO: Part 1: Set the `accommodations` attribute
        return "accommodations"
    }

    @GetMapping("/accommodation")
    fun createAccommodation(model: Model, @AuthenticationPrincipal principal: OAuth2User?): String {
        handlePrincipal(principal, model)

        model.addAttribute("accommodation", AccommodationEntity(
            name = "Skyline Tower Suites",
            address = "890 High Street, Chicago, IL 60610",
            description = "Experience the vibrant city of Chicago from the comfort of your own suite at Skyline " +
                    "Tower Suites. Our luxurious accommodations offer stunning views of the city skyline and easy " +
                    "access to all the best shopping, dining, and entertainment.",
            imageUrl = "/example/house5.png"
        ))
        return "createAccommodation"
    }

    @PostMapping("/accommodation")
    fun createAccommodationFormTarget(@ModelAttribute accommodation: AccommodationEntity): String {
        accommodation.id = 0
        accommodation.ratings = mutableListOf()

        advisorService.createAccommodation(accommodation)
        return "redirect:/accommodations"
    }

    @GetMapping("/accommodation/{accommodationId}")
    fun showAccommodation(
        model: Model,
        @PathVariable accommodationId: Long,
        @AuthenticationPrincipal principal: OAuth2User?
    ): String {
        handlePrincipal(principal, model)

        // TODO: Part 1: Set the `accommodation` and the `rating` attributes
        return "showAccommodation"
    }

    @PostMapping("/accommodation/{accommodationId}/rate")
    fun createRating(
        @PathVariable accommodationId: Long,
        @ModelAttribute rating: RatingEntity,
        @AuthenticationPrincipal principal: OAuth2User?
    ): String {
        rating.id = 0
        rating.userId = "todo"
        rating.userName = "System User"
        advisorService.createRating(accommodationId, rating)
        return "redirect:/accommodation/$accommodationId"
    }

    private fun handlePrincipal(principal: OAuth2User?, model: Model) {
        if (principal != null) {
            // TODO: Part 2: Add a `user` attribute here (type: ProfileResponse)
        }
    }

}
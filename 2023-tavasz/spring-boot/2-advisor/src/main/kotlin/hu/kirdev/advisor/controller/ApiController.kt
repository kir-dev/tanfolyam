package hu.kirdev.advisor.controller

import hu.kirdev.advisor.model.AccommodationEntity
import hu.kirdev.advisor.model.RatingEntity
import hu.kirdev.advisor.service.AdvisorService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ApiController(
    private val advisorService: AdvisorService
) {

    @GetMapping("/accommodation/{accommodationId}")
    fun showAccommodation(@PathVariable accommodationId: Long): ResponseEntity<AccommodationEntity> {
        return TODO("Get an accommodation by id")
    }

    @GetMapping("/rating/user/{userId}")
    fun showRatingsByUser(@PathVariable userId: String): ResponseEntity<List<RatingEntity>> {
        return TODO("Get all the ratings of a user")
    }

}
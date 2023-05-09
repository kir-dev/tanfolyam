package hu.kirdev.advisor.service

import hu.kirdev.advisor.model.AccommodationEntity
import hu.kirdev.advisor.model.RatingEntity
import java.util.*

//@Service
class DatabaseAdvisorService : AdvisorService {

    override fun getAccommodations(): List<AccommodationEntity> {
        return TODO("Return all accommodations")
    }

    override fun getAccommodation(id: Long): Optional<AccommodationEntity> {
        return TODO("Return an accommodations by id or Optional.empty()")
    }

    override fun createAccommodation(accommodation: AccommodationEntity) {
        TODO("Save the accommodation to the db")
    }

    override fun createRating(accommodationId: Long, rating: RatingEntity) {
        TODO("Create a rating and attach to the given accommodation")
    }

    override fun getRatingByUserId(userId: String): List<RatingEntity> {
        TODO("Get all ratings by a given user")
    }

}
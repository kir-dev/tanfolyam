package hu.kirdev.advisor.service

import hu.kirdev.advisor.model.AccommodationEntity
import hu.kirdev.advisor.model.RatingEntity
import java.util.*

interface AdvisorService {

    fun getAccommodations(): List<AccommodationEntity>

    fun getAccommodation(id: Long): Optional<AccommodationEntity>

    fun createAccommodation(accommodation: AccommodationEntity)

    fun createRating(accommodationId: Long, rating: RatingEntity)

    fun getRatingByUserId(userId: String): List<RatingEntity>

}
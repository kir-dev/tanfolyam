package hu.kirdev.advisor.service

import hu.kirdev.advisor.model.AccommodationEntity
import hu.kirdev.advisor.model.RatingEntity
import org.springframework.stereotype.Service
import java.util.*

@Service
class MemoryAdvisorService : AdvisorService {

    private val accommodations: MutableList<AccommodationEntity> = ArrayList()
    private val ratings: MutableList<RatingEntity> = ArrayList()

    override fun getAccommodations(): List<AccommodationEntity> {
        return accommodations
    }

    override fun getAccommodation(id: Long): Optional<AccommodationEntity> {
        return accommodations.stream()
            .filter { it.id == id }
            .findFirst()
    }

    override fun createAccommodation(accommodation: AccommodationEntity) {
        accommodation.id = accommodations.size.toLong() + 1
        accommodations.add(accommodation)
    }

    override fun createRating(accommodationId: Long, rating: RatingEntity) {
        getAccommodation(accommodationId).ifPresent { accommodation ->
            rating.id = ratings.size.toLong() + 1
            rating.accommodation = accommodation
            ratings.add(rating)
            accommodation.ratings.add(rating)
        }
    }

    override fun getRatingByUserId(userId: String): List<RatingEntity> {
        return ratings.stream()
            .filter { it.userId == userId }
            .toList()
    }

}
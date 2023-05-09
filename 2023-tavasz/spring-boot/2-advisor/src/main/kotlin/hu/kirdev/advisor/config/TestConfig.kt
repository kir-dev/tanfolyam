package hu.kirdev.advisor.config

import hu.kirdev.advisor.model.AccommodationEntity
import hu.kirdev.advisor.model.RatingEntity
import hu.kirdev.advisor.service.AdvisorService
import jakarta.annotation.PostConstruct
import org.springframework.context.annotation.Configuration

@Configuration
class TestConfig(
    private val advisorService: AdvisorService
) {

    @PostConstruct
    fun init() {
        if (advisorService.getAccommodations().isNotEmpty())
            return

        advisorService.createAccommodation(AccommodationEntity(
            name = "Vineyard View Inn",
            description = "Immerse yourself in the world-renowned wine country of Napa Valley at Vineyard View Inn." +
                    " Our cozy inn offers stunning views of the vineyards and easy access to all the best wineries " +
                    "and restaurants.",
            address = "567 Grapevine Lane, Napa Valley, CA 94558",
            imageUrl = "/example/house1.png"
        ))

        advisorService.createAccommodation(AccommodationEntity(
            name = "Mountain Lodge Retreat",
            description = "Surrounded by the natural beauty of the Rocky Mountains, Mountain Lodge Retreat offers a " +
                    "cozy escape from the hustle and bustle of city life. Our rustic-chic cabins are equipped with " +
                    "everything you need for a comfortable stay.",
            address = "456 Pine Tree Road, Aspen, CO 81611",
            imageUrl = "/example/house3.png"
        ))

        val accommodation3 = AccommodationEntity(
            name = "City Center Suites",
            description = "Experience the excitement of the city that never sleeps from the comfort of your own suite at " +
                    "City Center Suites. Our prime location puts you in the heart of Manhattan, with easy access to" +
                    " all the best attractions.",
            address = "789 Main Street, New York, NY 10001",
            imageUrl = "/example/house4.png"
        )
        advisorService.createAccommodation(accommodation3)

        advisorService.createRating(accommodation3.id, RatingEntity(
            userId = "example1",
            userName = "System User",
            comment = "This place is my favourite!",
            rating = 5
        ))

        advisorService.createRating(accommodation3.id, RatingEntity(
            userId = "example2",
            userName = "xXx_Example_User_xXx",
            comment = "Thanks I hate it!",
            rating = 1
        ))
    }

}
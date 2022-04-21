package hu.nemaberci.rocketmanager.service

import hu.nemaberci.rocketmanager.input.RocketInput
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class RocketServiceIT {

    @Autowired
    lateinit var rocketService: RocketService

    @Test
    fun testServiceWorks() {

        val radius = 5_000

        val input = RocketInput(
                coneShape = "Pointy",
                radius = radius,
                siloId = null
        )

        val rocket = rocketService.createRocket(
                input
        )

        val queriedRocket = rocketService.getRocket(rocket.id)

        assertThat(queriedRocket.id).isNotNull
        assertThat(queriedRocket.radius).isEqualTo(radius)

    }

}
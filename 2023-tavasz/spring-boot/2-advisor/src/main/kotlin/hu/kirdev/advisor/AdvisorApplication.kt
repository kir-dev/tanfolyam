package hu.kirdev.advisor

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class AdvisorApplication

fun main(args: Array<String>) {
    runApplication<AdvisorApplication>(*args)
}

package hu.nemaberci.rocketmanager

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class RocketmanagerApplication

fun main(args: Array<String>) {
    runApplication<RocketmanagerApplication>(*args)
}

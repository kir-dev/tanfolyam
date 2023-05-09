package hu.kirdev.webshop

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class WebshopApplication

fun main(args: Array<String>) {
    runApplication<WebshopApplication>(*args)
}

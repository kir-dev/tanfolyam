package hu.nemaberci.rocketmanager.controller.api

import hu.nemaberci.rocketmanager.exception.SiloFullException
import hu.nemaberci.rocketmanager.input.RocketInput
import hu.nemaberci.rocketmanager.service.RocketService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.ui.Model
import org.springframework.validation.FieldError
import org.springframework.validation.ObjectError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.*
import javax.validation.Valid


@RestController
@RequestMapping(path = ["/api/rockets"])
class RocketApiController {

    @Autowired
    lateinit var rocketService: RocketService

    @PostMapping("/{id}")
    fun updateRocket(model: Model,
                     @Valid rocketInput: RocketInput,
                     @PathVariable id: Long): ResponseEntity<Any> {
        try {
            rocketService.updateRocket(id, rocketInput)
        } catch (siloFullException: SiloFullException) {
            return ResponseEntity.badRequest()
                    .body(
                            mapOf(
                                    "errors" to listOf(
                                            mapOf(
                                                    "defaultMessage" to siloFullException.message!!,
                                                    "field" to "siloId"
                                            )
                                    )
                            )
                    )
        }
        return ResponseEntity.ok(null)
    }

    @PostMapping("/new")
    fun createRocket(model: Model,
                     @Valid rocketInput: RocketInput): ResponseEntity<Any> {
        try {
            rocketService.createRocket(rocketInput)
        } catch (siloFullException: SiloFullException) {
            return ResponseEntity.badRequest()
                    .body(
                            mapOf(
                                    "errors" to listOf(
                                            mapOf(
                                                    "defaultMessage" to siloFullException.message!!,
                                                    "field" to "siloId"
                                            )
                                    )
                            )
                    )
        }
        return ResponseEntity.ok(null)
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationExceptions(
            ex: MethodArgumentNotValidException): Map<String, String> {
        val errors: MutableMap<String, String> = HashMap()
        ex.bindingResult.allErrors.forEach { error: ObjectError ->
            val fieldName = (error as FieldError).field
            val errorMessage = error.defaultMessage
            errors[fieldName] = errorMessage!!
        }
        return errors
    }

    @GetMapping("/all")
    fun allRockets(): ResponseEntity<Any> {
        return ResponseEntity.ok(
                rocketService.listAllRockets()
        )
    }

}
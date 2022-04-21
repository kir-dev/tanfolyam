package hu.nemaberci.rocketmanager.controller.api

import hu.nemaberci.rocketmanager.exception.SiloFullException
import hu.nemaberci.rocketmanager.input.RocketInput
import hu.nemaberci.rocketmanager.input.RocketSiloInput
import hu.nemaberci.rocketmanager.service.RocketService
import hu.nemaberci.rocketmanager.service.RocketSiloService
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
@RequestMapping(path = ["/api/silos"])
class RocketSiloApiController {

    @Autowired
    lateinit var rocketSiloService: RocketSiloService

    @PostMapping("/{id}")
    fun updateRocket(model: Model,
                     @Valid rocketSiloInput: RocketSiloInput,
                     @PathVariable id: Long): ResponseEntity<Any> {
        rocketSiloService.updateRocketSilo(id, rocketSiloInput)
        return ResponseEntity.ok(null)
    }

    @PostMapping("/new")
    fun createRocket(model: Model,
                     @Valid rocketSiloInput: RocketSiloInput,): ResponseEntity<Any> {
        rocketSiloService.createRocketSilo(rocketSiloInput)
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
}
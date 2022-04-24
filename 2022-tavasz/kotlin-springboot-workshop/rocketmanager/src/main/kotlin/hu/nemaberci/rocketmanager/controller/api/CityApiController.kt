package hu.nemaberci.rocketmanager.controller.api

import hu.nemaberci.rocketmanager.input.CityInput
import hu.nemaberci.rocketmanager.service.CityService
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
@RequestMapping(path = ["/api/cities"])
class CityApiController {

    @Autowired
    lateinit var cityService: CityService

    @PostMapping("/{id}")
    fun updateRocket(model: Model,
                     @Valid cityInput: CityInput,
                     @PathVariable id: Long): ResponseEntity<Any> {
        cityService.updateCity(id, cityInput)
        return ResponseEntity.ok(null)
    }

    @RequestMapping(path = ["/new"], method = [RequestMethod.POST])
    fun createRocket(model: Model,
                     @Valid cityInput: CityInput): ResponseEntity<Any> {
        cityService.createCity(cityInput)
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
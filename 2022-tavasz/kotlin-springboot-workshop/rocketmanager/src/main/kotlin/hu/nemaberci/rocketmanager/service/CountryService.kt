package hu.nemaberci.rocketmanager.service

import hu.nemaberci.rocketmanager.dto.Country
import hu.nemaberci.rocketmanager.entity.CountryEntity
import hu.nemaberci.rocketmanager.exception.EntityByIdNotExistsException
import hu.nemaberci.rocketmanager.input.CountryInput
import hu.nemaberci.rocketmanager.repository.CountryRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
// todo: does not use dto
class CountryService {

    @Autowired
    lateinit var countryRepository: CountryRepository

    fun createCountry(countryInput: CountryInput): CountryEntity {
        val newCountryEntity = CountryEntity()
        newCountryEntity.name = countryInput.name
        newCountryEntity.code = countryInput.code
        return countryRepository.save(newCountryEntity)
    }

    fun listAllCountries(): List<Country> = countryRepository.findAll().map(Country::from)

    fun updateCountry(id: Long, countryInput: CountryInput): CountryEntity {
        val optionalCountryEntity = countryRepository.findById(id)
        val countryEntity =
                optionalCountryEntity.orElseThrow { EntityByIdNotExistsException("CountryEntity", id) }
        countryEntity.code = countryInput.code
        countryEntity.name = countryInput.name
        return countryRepository.save(countryEntity)
    }

}
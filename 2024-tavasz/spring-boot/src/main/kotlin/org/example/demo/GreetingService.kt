package org.example.demo

import org.springframework.stereotype.Service

interface GreetingService {
    fun greetPerson(name: String): String
    fun getGreetingCount(name: String): Long
    fun getGreetedPeople(): List<String>
}

@Service
class IstiGreetingService(val greetingRepository: GreetingRepository) : GreetingService {
    override fun greetPerson(name: String): String {
        greetingRepository.save(GreetingEntity(name = name))
        if (name.lowercase() == "isti") return "Szia Uram!"
        return "Oh, Hi $name!"
    }
    override fun getGreetingCount(name: String): Long = greetingRepository.countByNameIgnoreCase(name)

    override fun getGreetedPeople(): List<String> = greetingRepository.findDistinctNames()
}

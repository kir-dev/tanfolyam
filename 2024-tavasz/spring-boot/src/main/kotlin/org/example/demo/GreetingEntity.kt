package org.example.demo

import jakarta.persistence.*

@Entity
@Table(name = "greetings")
data class GreetingEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    var id: Int? = null,
    var name: String = ""
)

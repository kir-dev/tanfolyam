package hu.kirdev.webchat.usecase.chat

import java.time.Instant

data class ChatMessage(
    var from: String = "",
    var content: String = "",
    var timestamp: Instant = Instant.now()
)
package hu.kirdev.webchat.usecase.minecraft

enum class MessageType {
    MESSAGE,
    STATUS,
    EVENT
}

data class MinecraftChatMessage(
    var from: String = "",
    var uuid: String = "",
    var content: String = "",
    var messageType: MessageType = MessageType.MESSAGE
)
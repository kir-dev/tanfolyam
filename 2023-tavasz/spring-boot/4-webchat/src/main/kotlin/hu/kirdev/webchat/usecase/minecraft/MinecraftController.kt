package hu.kirdev.webchat.usecase.minecraft

import org.slf4j.LoggerFactory
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class MinecraftController(
    private val messaging: SimpMessagingTemplate
) {

    private val log = LoggerFactory.getLogger(this::class.java)

    @GetMapping("/minecraft")
    fun minecraftIndex() = "minecraft"

    // in:  /app/minecraft/web-send (message: MinecraftChatMessage)
    // out: /topic/minecraft/mc-messages (message: MinecraftChatMessage)
    // out: /topic/minecraft/web-messages (message: MinecraftChatMessage)
    @MessageMapping("/minecraft/web-send")
    fun receiveFromWeb(message: MinecraftChatMessage) {
        if (message.messageType == MessageType.MESSAGE) {
            messaging.convertAndSend("/topic/minecraft/mc-messages", message)
            messaging.convertAndSend("/topic/minecraft/web-messages", message)
        }
    }

    // in:  /app/minecraft/mc-send (message: MinecraftChatMessage)
    // out: /topic/minecraft/web-messages (message: MinecraftChatMessage)
    @MessageMapping("/minecraft/mc-send")
    @SendTo("/topic/minecraft/web-messages")
    fun receiveFromMinecraft(message: MinecraftChatMessage): MinecraftChatMessage {
        return message
    }

    // in:  /app/minecraft/web-command (command: MinecraftCommand)
    // out: /topic/minecraft/mc-control (command: MinecraftCommand)
    @MessageMapping("/minecraft/web-command")
    @SendTo("/topic/minecraft/mc-control")
    fun sendCommand(command: MinecraftCommand): MinecraftCommand {
        return command
    }

}
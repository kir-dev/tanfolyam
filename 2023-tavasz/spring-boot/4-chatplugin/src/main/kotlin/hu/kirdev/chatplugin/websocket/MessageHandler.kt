package hu.kirdev.chatplugin.websocket

import hu.kirdev.chatplugin.model.MessageType
import hu.kirdev.chatplugin.model.MinecraftChatMessage
import org.bukkit.Bukkit
import org.springframework.lang.Nullable
import org.springframework.messaging.simp.stomp.StompFrameHandler
import org.springframework.messaging.simp.stomp.StompHeaders
import java.lang.reflect.Type

class MessageHandler : StompFrameHandler {

    override fun getPayloadType(headers: StompHeaders): Type {
        return MinecraftChatMessage::class.java
    }

    override fun handleFrame(headers: StompHeaders, @Nullable payload: Any?) {
        val message = payload as MinecraftChatMessage
        when (message.messageType) {
            MessageType.MESSAGE -> Bukkit.broadcastMessage("<§7[WEB] §7${message.from}§f> §f${message.content}")
            MessageType.STATUS -> Bukkit.broadcastMessage("§e${message.content}")
            MessageType.EVENT -> Bukkit.broadcastMessage("§b${message.content}")
        }
    }

}
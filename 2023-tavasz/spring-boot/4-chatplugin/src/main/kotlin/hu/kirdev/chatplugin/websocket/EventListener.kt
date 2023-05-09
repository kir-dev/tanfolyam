package hu.kirdev.chatplugin.websocket

import hu.kirdev.chatplugin.model.MessageType
import hu.kirdev.chatplugin.model.MinecraftChatMessage
import org.bukkit.entity.EntityType
import org.bukkit.event.EventHandler
import org.bukkit.event.Listener
import org.bukkit.event.entity.EntityDeathEvent
import org.bukkit.event.entity.PlayerDeathEvent
import org.bukkit.event.player.AsyncPlayerChatEvent
import org.bukkit.event.player.PlayerJoinEvent
import org.bukkit.event.player.PlayerQuitEvent
import org.springframework.messaging.simp.stomp.StompSession


private const val MC_SEND_TOPIC = "/app/minecraft/mc-send"

private const val SYSTEM_USER = "system"

class EventListener(
    private val stompSession: StompSession
) : Listener {

    @EventHandler
    fun onPlayerJoin(event: PlayerJoinEvent) {
        stompSession.send(
            MC_SEND_TOPIC, MinecraftChatMessage(
                SYSTEM_USER, SYSTEM_USER,
                "${event.player.name} joined the game", MessageType.STATUS))
    }

    @EventHandler
    fun onPlayerLeave(event: PlayerQuitEvent) {
        stompSession.send(
            MC_SEND_TOPIC, MinecraftChatMessage(
                SYSTEM_USER, SYSTEM_USER, "${event.player.name} left the game", MessageType.STATUS))
    }

    @EventHandler
    fun onPlayerChat(event: AsyncPlayerChatEvent) {
        stompSession.send(
            MC_SEND_TOPIC, MinecraftChatMessage(
            event.player.name,
            event.player.uniqueId.toString(),
            event.message,
            MessageType.MESSAGE))
    }

    @EventHandler
    fun onPlayerDeath(event: PlayerDeathEvent) {
        if (event.entity.killer != null) {
            stompSession.send(
                MC_SEND_TOPIC, MinecraftChatMessage(
                    SYSTEM_USER, SYSTEM_USER,
                "${event.entity.name} got killed by ${event.entity.killer!!.name}", MessageType.EVENT))
        } else {
            stompSession.send(
                MC_SEND_TOPIC, MinecraftChatMessage(
                    SYSTEM_USER, SYSTEM_USER,
                "${event.entity.name} died", MessageType.EVENT))
        }
    }

    @EventHandler
    fun onEntityDeath(event: EntityDeathEvent) {
        val entity = event.entity
        val killer = entity.killer

        if (killer != null && entity.type != EntityType.PLAYER) {
            stompSession.send(
                MC_SEND_TOPIC, MinecraftChatMessage(
                    SYSTEM_USER, SYSTEM_USER,
                    "${killer.name} killed a(n) ${entity.type.name}", MessageType.EVENT))
        }
    }

}
package hu.kirdev.chatplugin

import hu.kirdev.chatplugin.model.MessageType
import hu.kirdev.chatplugin.model.MinecraftChatMessage
import hu.kirdev.chatplugin.websocket.CommandHandler
import hu.kirdev.chatplugin.websocket.EventListener
import hu.kirdev.chatplugin.websocket.MessageHandler
import org.bukkit.plugin.java.JavaPlugin
import org.springframework.messaging.converter.MappingJackson2MessageConverter
import org.springframework.messaging.simp.stomp.StompSession
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter
import org.springframework.web.socket.client.standard.StandardWebSocketClient
import org.springframework.web.socket.messaging.WebSocketStompClient
import org.springframework.web.socket.sockjs.client.SockJsClient
import org.springframework.web.socket.sockjs.client.Transport
import org.springframework.web.socket.sockjs.client.WebSocketTransport
import java.util.concurrent.ExecutionException


class Plugin : JavaPlugin() {

    private lateinit var stompClient: WebSocketStompClient
    private lateinit var stompSession: StompSession

    override fun onEnable() {
        setupStompClient("ws://127.0.0.1:8080/ws")
    }

    override fun onDisable() {
        disconnectStompClient()
    }

    private fun setupStompClient(url: String) {
        val sockJsClient = SockJsClient(listOf(WebSocketTransport(StandardWebSocketClient())))
        stompClient = WebSocketStompClient(sockJsClient)
        stompClient.messageConverter = MappingJackson2MessageConverter()
        try {
            stompSession = stompClient.connect(url, object : StompSessionHandlerAdapter() {}).get()
            stompSession.subscribe("/topic/minecraft/mc-messages", MessageHandler())
            stompSession.subscribe("/topic/minecraft/mc-control", CommandHandler(this))

            stompSession.send("/app/minecraft/mc-send",
                MinecraftChatMessage("system", "system", "Minecraft server connected", MessageType.STATUS))
            server.pluginManager.registerEvents(EventListener(stompSession), this)

        } catch (e: InterruptedException) {
            logger.severe("Error connecting to STOMP server: " + e.message)
        } catch (e: ExecutionException) {
            logger.severe("Error connecting to STOMP server: " + e.message)
        }
    }

    private fun disconnectStompClient() {
        stompSession.disconnect()
        stompClient.stop()
    }

}
package hu.kirdev.chatplugin.websocket

import hu.kirdev.chatplugin.Plugin
import hu.kirdev.chatplugin.model.MinecraftCommand
import org.bukkit.Bukkit
import org.bukkit.Location
import org.bukkit.Material
import org.bukkit.entity.Entity
import org.bukkit.entity.EntityType
import org.bukkit.entity.Zombie
import org.bukkit.inventory.ItemStack
import org.bukkit.potion.PotionEffect
import org.bukkit.potion.PotionEffectType
import org.springframework.lang.Nullable
import org.springframework.messaging.simp.stomp.StompFrameHandler
import org.springframework.messaging.simp.stomp.StompHeaders
import java.lang.reflect.Type


class CommandHandler(
    private val plugin: Plugin
) : StompFrameHandler {

    override fun getPayloadType(headers: StompHeaders): Type {
        return MinecraftCommand::class.java
    }

    override fun handleFrame(headers: StompHeaders, @Nullable payload: Any?) {
        val command = payload as MinecraftCommand
        when (command.type) {
            "strike" -> executeLightningStrike(command)
            "zombie" -> executeSpawnZombie(command)
            "heal" -> executeHealPlayers(command)
        }
    }

    private fun executeLightningStrike(command: MinecraftCommand) {
        Bukkit.getServer().scheduler.runTaskLater(plugin, Runnable {
            val world = Bukkit.getWorld(command.world)
            if (world != null) {
                val location = Location(world, command.x.toDouble(), command.y.toDouble(), command.z.toDouble())
                world.strikeLightning(location)
            }
        }, 0L)
    }

    private fun executeSpawnZombie(command: MinecraftCommand) {
        Bukkit.getServer().scheduler.runTaskLater(plugin, Runnable {
            val world = Bukkit.getWorld(command.world)
            if (world != null) {
                val location = Location(world, command.x.toDouble(), command.y.toDouble(), command.z.toDouble())
                val entity: Entity = world.spawnEntity(location, EntityType.ZOMBIE)
                if (entity is Zombie) {
                    val equipment = entity.equipment
                    if (equipment != null) {
                        equipment.helmet = ItemStack(Material.GOLDEN_HELMET)
                    }
                }
            }
        }, 0L)
    }

    private fun executeHealPlayers(command: MinecraftCommand) {
        Bukkit.getServer().scheduler.runTaskLater(plugin, Runnable {
            val healingEffect = PotionEffect(PotionEffectType.HEAL, 1, 1)

            for (player in Bukkit.getOnlinePlayers()) {
                player.addPotionEffect(healingEffect)
            }
        }, 0L)
    }

}
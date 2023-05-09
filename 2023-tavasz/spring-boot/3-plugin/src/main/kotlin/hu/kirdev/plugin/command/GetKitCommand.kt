package hu.kirdev.plugin.command

import hu.kirdev.plugin.repo.Repository
import org.bukkit.Material
import org.bukkit.command.Command
import org.bukkit.command.CommandExecutor
import org.bukkit.command.CommandSender
import org.bukkit.entity.Player
import org.bukkit.inventory.ItemStack

class GetKitCommand(val repository: Repository) : CommandExecutor {

    override fun onCommand(sender: CommandSender, command: Command, label: String, args: Array<out String>): Boolean {
        if (sender !is Player) {
            return false
        }

        if (args.isEmpty()) {
            val items = repository.getKits(sender.name)
            sender.sendMessage("§eYour Kits:")
            if (items.isEmpty())
                sender.sendMessage("§7You have no kits yet!")

            items.forEach { sender.sendMessage("§7- /getkit §a" + it.id + "§7 -> " + (it.product?.name ?: "n/a")) }

            return true
        }

        val kits = repository.getKits(sender.name)
        val purchaseId = args[0].toLongOrNull() ?: 0L

        if (kits.none { it.id == purchaseId }) {
            sender.sendMessage("§7Kit not found!")
            return true
        }

        if (repository.usePurchase(purchaseId)) {
            sender.sendMessage("§aHere you have it!")

            val kit = kits.first { it.id == purchaseId }
            kit.product?.items?.forEach {

                println(it)

                // Give one item at a time
                val item = ItemStack(Material.getMaterial(it.type)!!, it.amount)
                val meta = item.itemMeta!!
                meta.setDisplayName(it.displayName)
                item.itemMeta = meta
                sender.inventory.addItem(item)

            }

        } else {
            sender.sendMessage("§7Already used!")
        }

        return true
    }

}
package hu.kirdev.plugin

import hu.kirdev.plugin.command.GetKitCommand
import hu.kirdev.plugin.repo.Repository
import hu.kirdev.webshop.model.ItemEntity
import hu.kirdev.webshop.model.ProductEntity
import hu.kirdev.webshop.model.PurchaseEntity
import hu.kirdev.webshop.model.UserEntity
import org.bukkit.plugin.java.JavaPlugin
import org.hibernate.SessionFactory
import org.hibernate.cfg.Configuration
import java.io.File

const val HIBERNATE_CONFIG_FILE_NAME = "hibernate.cfg.xml"

class Plugin : JavaPlugin() {


    private var hibernateSessionFactory: SessionFactory? = null

    override fun onEnable() {

        saveResource(HIBERNATE_CONFIG_FILE_NAME, false)
        val sessionFactory = Configuration()
            .configure(File(dataFolder.absolutePath + "/" + HIBERNATE_CONFIG_FILE_NAME))
            .addAnnotatedClass(ItemEntity::class.java)
            .addAnnotatedClass(ProductEntity::class.java)
            .addAnnotatedClass(PurchaseEntity::class.java)
            .addAnnotatedClass(UserEntity::class.java)
            .buildSessionFactory()

        val repository = Repository(sessionFactory)
        hibernateSessionFactory = sessionFactory
        getCommand("getkit")!!.setExecutor(GetKitCommand(repository))

    }

    override fun onDisable() {
        if (hibernateSessionFactory != null) {
            hibernateSessionFactory?.close()
        }
    }



}
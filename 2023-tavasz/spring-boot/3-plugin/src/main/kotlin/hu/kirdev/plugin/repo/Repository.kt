package hu.kirdev.plugin.repo

import hu.kirdev.webshop.model.PurchaseEntity
import hu.kirdev.webshop.model.UserEntity
import org.hibernate.Session
import org.hibernate.SessionFactory


class Repository(val sessionFactory: SessionFactory) {

    fun getKits(username: String): List<PurchaseEntity> {

        val session: Session = sessionFactory.currentSession
        session.beginTransaction()

        val player = session.createQuery("from UserEntity u where u.minecraftUsername = :username", UserEntity::class.java)
        player.setParameter("username", username)
        val playerEntity = player.singleResultOrNull
        if (playerEntity == null) {
            session.transaction.commit()
            session.close()
            return listOf()
        }

        val query = session.createQuery("from PurchaseEntity p where p.userId = :userId and p.used = false", PurchaseEntity::class.java)
        query.setParameter("userId", playerEntity.id)
        val purchases = query.resultList

        session.transaction.commit()
        session.close()

        return purchases
    }

    fun usePurchase(purchaseId: Long): Boolean {
        val session: Session = this.sessionFactory.currentSession
        session.beginTransaction()
        val purchase: PurchaseEntity = session.get(PurchaseEntity::class.java, purchaseId)
        if (purchase.used) {
            session.transaction.commit()
            session.close()
            return false
        }

        purchase.used = true
        session.merge(purchase)
        session.transaction.commit()
        session.close()
        return true
    }


}
package hu.kirdev.webshop.service

import hu.kirdev.webshop.authsch.ProfileResponse
import hu.kirdev.webshop.model.UserEntity
import hu.kirdev.webshop.repo.UserRepo
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Isolation
import org.springframework.transaction.annotation.Transactional

@Service
open class UserService(
    private val userRepo: UserRepo
) {

    @Transactional(readOnly = false, isolation = Isolation.READ_COMMITTED)
    open fun setUsername(id: Long, username: String) {
        userRepo.findById(id).ifPresent {
            it.minecraftUsername = username
            userRepo.save(it)
        }
    }

    @Transactional(readOnly = false, isolation = Isolation.SERIALIZABLE)
    open fun getOrCreateUser(profile: ProfileResponse): Long {
        return userRepo.findByInternalId(profile.internalId)
            .map { it.id }
            .orElseGet {
                val userEntity = UserEntity(
                    internalId = profile.internalId,
                    money = 5000
                )
                userRepo.save(userEntity)
                return@orElseGet userEntity.id
            }
    }

    @Transactional(readOnly = true, isolation = Isolation.READ_COMMITTED)
    open fun getUserById(id: Long): UserEntity {
        return userRepo.findById(id).orElseThrow()
    }

}
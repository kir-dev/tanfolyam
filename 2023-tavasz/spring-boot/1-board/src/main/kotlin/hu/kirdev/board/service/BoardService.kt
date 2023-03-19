package hu.kirdev.board.service

import hu.kirdev.board.model.BoardMessage
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class BoardService {

    // NOTE: That this solution is not a good practice

    private val inMemoryDatabase: MutableList<BoardMessage> = mutableListOf()
    private var lastId = 0

    fun createMessage(name: String, message: String) {
        inMemoryDatabase.add(
            BoardMessage(
                id = lastId++,
                name = name,
                message = message,
                timestamp = Instant.now().toEpochMilli()
            )
        )
    }

    fun getAllMessages(): List<BoardMessage> = inMemoryDatabase

}
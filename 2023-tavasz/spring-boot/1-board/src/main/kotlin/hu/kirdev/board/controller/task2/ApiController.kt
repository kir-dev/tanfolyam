package hu.kirdev.board.controller.task2

import hu.kirdev.board.service.BoardService
import org.springframework.web.bind.annotation.RestController

@RestController
class ApiController(
    private val boardService: BoardService
) {

    // GET /api/board List<BoardMessage>

}
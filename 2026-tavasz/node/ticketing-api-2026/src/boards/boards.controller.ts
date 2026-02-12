import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardWithTickets } from './entities/board-with-tickets.entity';
import { Board } from './entities/board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The board has been successfully created',
    type: Board,
  })
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BoardWithTickets })
  @ApiNotFoundResponse({ description: 'Board not found' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<BoardWithTickets> {
    return this.boardsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated board', type: Board })
  @ApiNotFoundResponse({ description: 'Board not found' })
  @ApiBadRequestResponse({ description: 'Could not update board' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted board', type: Board })
  @ApiNotFoundResponse({ description: 'Board not found' })
  @ApiBadRequestResponse({ description: 'Could not delete board' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.remove(id);
  }
}

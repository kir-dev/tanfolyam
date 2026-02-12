import { OmitType } from '@nestjs/swagger';
import { Board } from '../entities/board.entity';

export class CreateBoardDto extends OmitType(Board, ['id', 'createdAt']) {}

import { ApiProperty } from '@nestjs/swagger';
import { TicketPhase } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class Ticket {
  @IsNumber()
  @Min(1)
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsEnum(TicketPhase)
  @ApiProperty({ enum: TicketPhase })
  ticketPhase: TicketPhase;

  @IsNumber()
  boardsId: number;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

import { OmitType } from '@nestjs/swagger';
import { Ticket } from '../entities/ticket.entity';

export class CreateTicketDto extends OmitType(Ticket, [
  'id',
  'createdAt',
  'updatedAt',
]) {}

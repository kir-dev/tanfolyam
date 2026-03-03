import { Ticket } from '../../tickets/entities/ticket.entity';
import { Board } from './board.entity';

export class BoardWithTickets extends Board {
  tickets: Ticket[] = [];
}

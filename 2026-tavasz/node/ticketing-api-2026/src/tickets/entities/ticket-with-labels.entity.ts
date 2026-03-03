import { Label } from '../../labels/entities/label.entity';
import { Ticket } from './ticket.entity';

export class TicketWithLabels extends Ticket {
  labels: Label[] = [];
}

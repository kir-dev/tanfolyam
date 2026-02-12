import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { TicketWithLabels } from './entities/ticket-with-labels.entity';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: Prisma.TicketUncheckedCreateInput) {
    try {
      return await this.prisma.ticket.create({
        data: createTicketDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003') {
          throw new NotFoundException(
            `Board with id ${createTicketDto.boardsId} not found`,
          );
        }
      }
      console.error(e);
      throw new BadRequestException('Could not create ticket');
    }
  }

  async findAll(): Promise<TicketWithLabels[]> {
    return await this.prisma.ticket.findMany({
      include: {
        labels: true,
      },
    });
  }

  async findOne(id: number): Promise<TicketWithLabels> {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        labels: true,
      },
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }

    return ticket;
  }

  async update(id: number, updateTicketDto: Prisma.TicketUncheckedUpdateInput) {
    try {
      return this.prisma.ticket.update({
        where: { id },
        data: updateTicketDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Ticket with id ${id} not found`);
        }
      }
      console.error(e);
      throw new BadRequestException(`Could not update ticket with id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.ticket.delete({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Ticket with id ${id} not found`);
        }
      }
      console.error(e);
      throw new BadRequestException(`Could not delete ticket with id ${id}`);
    }
  }

  async assignLabel(
    ticketId: number,
    labelId: number,
  ): Promise<TicketWithLabels> {
    try {
      return await this.prisma.ticket.update({
        where: { id: ticketId },
        data: {
          labels: {
            connect: { id: labelId },
          },
        },
        include: {
          labels: true,
        },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Invalid label id');
        }
        if (e.code === 'P2016') {
          throw new NotFoundException('Invalid ticket id');
        }
      }
      throw new BadRequestException(`Could not assign label to ticket`);
    }
  }

  async removeLabel(
    ticketId: number,
    labelId: number,
  ): Promise<TicketWithLabels> {
    try {
      return await this.prisma.ticket.update({
        where: { id: ticketId },
        data: {
          labels: {
            disconnect: { id: labelId },
          },
        },
        include: {
          labels: true,
        },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException('Invalid label id');
        }
      }
      throw new BadRequestException(`Could not remove label from ticket`);
    }
  }
}

/* eslint-disable */
export default async () => {
  const t = {
    ['./labels/entities/label.entity']:
      await import('./labels/entities/label.entity'),
    ['./boards/entities/board.entity']:
      await import('./boards/entities/board.entity'),
    ['./boards/entities/board-with-tickets.entity']:
      await import('./boards/entities/board-with-tickets.entity'),
    ['./tickets/entities/ticket.entity']:
      await import('./tickets/entities/ticket.entity'),
    ['./tickets/entities/ticket-with-labels.entity']:
      await import('./tickets/entities/ticket-with-labels.entity'),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./labels/entities/label.entity'),
          {
            Label: {
              id: {
                required: true,
                type: () => Number,
                default: 0,
                minimum: 1,
              },
              name: { required: true, type: () => String, default: '' },
              color: {
                required: true,
                type: () => String,
                default: '',
                pattern:
                  '^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$',
              },
            },
          },
        ],
        [import('./labels/dto/create-label.dto'), { CreateLabelDto: {} }],
        [import('./labels/dto/update-label.dto'), { UpdateLabelDto: {} }],
        [
          import('./boards/entities/board.entity'),
          {
            Board: {
              id: {
                required: true,
                type: () => Number,
                default: 0,
                minimum: 1,
              },
              title: { required: true, type: () => String, default: '' },
              createdAt: {
                required: true,
                type: () => Date,
                default: new Date(),
              },
            },
          },
        ],
        [
          import('./boards/entities/board-with-tickets.entity'),
          {
            BoardWithTickets: {
              tickets: { required: true, type: () => [Object] },
            },
          },
        ],
        [import('./boards/dto/create-board.dto'), { CreateBoardDto: {} }],
        [import('./boards/dto/update-board.dto'), { UpdateBoardDto: {} }],
        [
          import('./tickets/entities/ticket.entity'),
          {
            Ticket: {
              id: {
                required: true,
                type: () => Number,
                default: 0,
                minimum: 1,
              },
              name: { required: true, type: () => String, default: '' },
              description: {
                required: true,
                type: () => String,
                nullable: true,
                default: null,
              },
              ticketPhase: { required: true, type: () => Object },
              boardsId: { required: true, type: () => Number, default: 0 },
              createdAt: {
                required: true,
                type: () => Date,
                default: new Date(),
              },
              updatedAt: {
                required: true,
                type: () => Date,
                default: new Date(),
              },
            },
          },
        ],
        [
          import('./tickets/entities/ticket-with-labels.entity'),
          {
            TicketWithLabels: {
              labels: {
                required: true,
                type: () => [t['./labels/entities/label.entity'].Label],
              },
            },
          },
        ],
        [import('./tickets/dto/create-ticket.dto'), { CreateTicketDto: {} }],
        [import('./tickets/dto/update-ticket.dto'), { UpdateTicketDto: {} }],
      ],
      controllers: [
        [
          import('./app.controller'),
          { AppController: { getHello: { type: String } } },
        ],
        [
          import('./labels/labels.controller'),
          {
            LabelsController: {
              create: { type: t['./labels/entities/label.entity'].Label },
              findAll: { type: [t['./labels/entities/label.entity'].Label] },
              findOne: { type: t['./labels/entities/label.entity'].Label },
              update: { type: t['./labels/entities/label.entity'].Label },
              remove: { type: t['./labels/entities/label.entity'].Label },
            },
          },
        ],
        [
          import('./boards/boards.controller'),
          {
            BoardsController: {
              create: { type: t['./boards/entities/board.entity'].Board },
              findAll: { type: [t['./boards/entities/board.entity'].Board] },
              findOne: {
                type: t['./boards/entities/board-with-tickets.entity']
                  .BoardWithTickets,
              },
              update: { type: t['./boards/entities/board.entity'].Board },
              remove: { type: t['./boards/entities/board.entity'].Board },
            },
          },
        ],
        [
          import('./tickets/tickets.controller'),
          {
            TicketsController: {
              create: { type: t['./tickets/entities/ticket.entity'].Ticket },
              findAll: {
                type: [
                  t['./tickets/entities/ticket-with-labels.entity']
                    .TicketWithLabels,
                ],
              },
              findOne: {
                type: t['./tickets/entities/ticket-with-labels.entity']
                  .TicketWithLabels,
              },
              update: { type: t['./tickets/entities/ticket.entity'].Ticket },
              remove: { type: t['./tickets/entities/ticket.entity'].Ticket },
              assignLabel: {
                type: t['./tickets/entities/ticket-with-labels.entity']
                  .TicketWithLabels,
              },
              removeLabel: {
                type: t['./tickets/entities/ticket-with-labels.entity']
                  .TicketWithLabels,
              },
            },
          },
        ],
      ],
    },
  };
};

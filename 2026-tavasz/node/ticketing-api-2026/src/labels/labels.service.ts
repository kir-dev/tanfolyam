import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLabelDto: Prisma.LabelCreateInput): Promise<Label> {
    try {
      return await this.prisma.label.create({
        data: createLabelDto,
      });
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Could not create label');
    }
  }

  async findAll(): Promise<Label[]> {
    return await this.prisma.label.findMany();
  }

  async findOne(id: number): Promise<Label> {
    const label = await this.prisma.label.findUnique({
      where: { id },
    });

    if (!label) {
      throw new NotFoundException(`Label with id ${id} not found`);
    }

    return label;
  }

  async update(
    id: number,
    updateLabelDto: Prisma.LabelUpdateInput,
  ): Promise<Label> {
    try {
      return await this.prisma.label.update({
        where: { id },
        data: updateLabelDto,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Label with id ${id} not found`);
        }
      }
      console.error(e);
      throw new BadRequestException(`Could not update label with id ${id}`);
    }
  }

  async remove(id: number): Promise<Label> {
    try {
      return await this.prisma.label.delete({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new NotFoundException(`Label with id ${id} not found`);
        }
      }
      console.error(e);
      throw new BadRequestException('Could not delete label');
    }
  }
}

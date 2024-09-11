import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Task } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateTaskDto } from './dto/task.create.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(query: {
    filter?: Prisma.TaskWhereInput;
    sort?: Prisma.TaskOrderByWithRelationInput;
    skip?: number;
    take?: number;
  }) {
    const { filter, sort, skip, take } = query;
    return this.prisma.task.findMany({
      where: filter,
      orderBy: sort,
      skip,
      take,
    });
  }

  async getById(id: string) {
    const oldUser = await this.prisma.task.findUnique({
      where: { id: id },
    });

    if (!oldUser) throw new NotFoundException('Задача не найдена');
    return this.prisma.task.findUnique({
      where: { id: id },
    });
  }

  async create(dto: CreateTaskDto, userId: string) {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async update(taskId: string, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) throw new NotFoundException('Задача не найдена');

    const data: Prisma.TaskUpdateInput = {
      title: dto.title,
      description: dto.description,
      status: dto.status,
    };

    if (dto.userId) {
      data.user = { connect: { id: dto.userId } };
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: data,
    });
  }

  async remove(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id: id } });

    if (!task) throw new NotFoundException('Задача не найдена');

    return this.prisma.task.delete({ where: { id: id } });
  }
}

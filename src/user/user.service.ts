import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hash } from 'argon2';
import { AuthDto } from '../auth/dto/auth.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(private prisma: PrismaService) {}

  async getAll(query: {
    filter?: Prisma.UserWhereInput;
    sort?: Prisma.UserOrderByWithRelationInput;
    skip?: number;
    take?: number;
  }) {
    const { filter, sort, skip, take } = query;
    return this.prisma.user.findMany({
      where: filter,
      orderBy: sort,
      skip,
      take,
      include: {
        tasks: true,
      },
    });
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { tasks: true },
    });
    return user;
  }

  async create(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
      include: {
        tasks: true,
      },
    });
  }

  async update(id: string, dto: AuthDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
      include: {
        tasks: true,
      },
    });
  }

  async updateAvatar(id: string, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        avatar: avatarUrl,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { Auth } from '../auth/decorators/auth.decorator';
import { AuthDto } from '../auth/dto/auth.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('filter') filter?: string,
    @Query('sort') sort?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    const queryFilter = {
      ...(filter ? JSON.parse(filter) : {}),
      ...(name ? { name: { contains: name } } : {}),
      ...(email ? { email: { contains: email } } : {}),
    };

    const query = {
      filter: queryFilter,
      sort: sort ? JSON.parse(sort) : undefined,
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    };
    return this.userService.getAll(query);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);

    if (oldUser) throw new BadRequestException('Пользователь уже существует');
    return this.userService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: AuthDto) {
    return this.userService.update(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const user = await this.userService.getById(id);
    if (!user) throw new NotFoundException('Пользователь не найден');
    return this.userService.delete(id);
  }

  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Неподдерживаемый тип файла'),
            false,
          );
        }
      },
    }),
  )
  @Post(':id/avatar')
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Файл не загружен');
    }

    const avatarUrl = `/uploads/avatars/${file.filename}`;
    return this.userService.updateAvatar(id, avatarUrl);
  }
}

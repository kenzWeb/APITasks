import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateTaskDto } from './dto/task.create.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Auth()
  @Get()
  async getAll(
    @Query('title') title?: string,
    @Query('description') description?: string,
    @Query('filter') filter?: string,
    @Query('sort') sort?: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    const queryFilter = {
      ...(filter ? JSON.parse(filter) : {}),
      ...(title ? { title: { contains: title } } : {}),
      ...(description ? { description: { contains: description } } : {}),
    };

    const query = {
      filter: queryFilter,
      sort: sort ? JSON.parse(sort) : undefined,
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    };
    return this.taskService.getAll(query);
  }

  @Auth()
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.taskService.getById(id);
  }

  @Auth()
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
    const userId = req.user.id;
    return this.taskService.create(createTaskDto, userId);
  }

  @Auth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}

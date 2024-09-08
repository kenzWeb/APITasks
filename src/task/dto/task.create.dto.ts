import { IsOptional, IsString } from 'class-validator';
import { ETaskStatus } from '../task.interface';

export class CreateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  status: ETaskStatus;

  @IsString()
  @IsOptional()
  userId: string;
}

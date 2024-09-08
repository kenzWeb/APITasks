import { IsOptional, IsString } from 'class-validator';
import { ETaskStatus } from '../task.interface';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  status: ETaskStatus;

  @IsOptional()
  @IsString()
  userId: string;
}

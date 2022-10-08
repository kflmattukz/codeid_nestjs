import { IsString, IsNumber } from 'class-validator';

export class CreateJobDto {
  @IsString()
  jobId: string;

  @IsString()
  jobTitle: string;

  @IsNumber()
  minSalary: number;

  @IsNumber()
  maxSalary: number;
}

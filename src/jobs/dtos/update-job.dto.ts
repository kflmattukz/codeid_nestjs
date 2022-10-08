import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  jobId: string;

  @IsString()
  @IsOptional()
  jobTitle: string;

  @IsNumber()
  @IsOptional()
  minSalary: number;

  @IsNumber()
  @IsOptional()
  maxSalary: number;
}

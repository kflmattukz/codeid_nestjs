import { IsNumber, IsString, IsOptional } from 'class-validator';

export class UpdateJhDto {
  @IsNumber()
  @IsOptional()
  employeeId: number;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  endDate: string;

  @IsString()
  @IsOptional()
  jobId: string;

  @IsNumber()
  @IsOptional()
  departmentId: number;
}

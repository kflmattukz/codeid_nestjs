import { IsNumber, IsString } from 'class-validator';

export class CreateJhDto {
  @IsNumber()
  employeeId: number;

  @IsString()
  startDate: string;

  @IsString()
  endDate: string;

  @IsString()
  jobId: string;

  @IsNumber()
  departmentId: number;
}

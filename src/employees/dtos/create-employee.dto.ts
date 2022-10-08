import {
  IsString,
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  hireDate: string;

  @IsNumber()
  salary: string;

  @IsString()
  @IsOptional()
  commissionPct: string;

  @IsNumber()
  @IsOptional()
  xempId: number;

  @IsNumber()
  departmentId: number;

  @IsString()
  jobId: string;

  @IsNumber()
  managerId: number;
}

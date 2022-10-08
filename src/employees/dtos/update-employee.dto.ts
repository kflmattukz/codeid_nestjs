import {
  IsString,
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class UpdateEmployeeDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  hireDate: string;

  @IsNumber()
  @IsOptional()
  salary: string;

  @IsString()
  @IsOptional()
  commissionPct: string;

  @IsNumber()
  @IsOptional()
  xempId: number;

  @IsNumber()
  @IsOptional()
  departmentId: number;

  @IsString()
  @IsOptional()
  jobId: string;

  @IsNumber()
  @IsOptional()
  managerId: number;
}

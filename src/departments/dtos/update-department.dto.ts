import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @IsOptional()
  departmentName: string;

  @IsNumber()
  @IsOptional()
  locationId: number;

  @IsNumber()
  @IsOptional()
  managerId: number;
}

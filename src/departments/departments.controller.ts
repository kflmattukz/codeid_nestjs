import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dtos/create-department.dto';
import { UpdateDepartmentDto } from './dtos/update-department.dto';

@Controller('api/departments')
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Get()
  getAll() {
    return this.departmentsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.departmentsService.getById(id);
  }

  @Post()
  create(@Body() fields: CreateDepartmentDto) {
    return this.departmentsService.create(
      fields.departmentName,
      fields.locationId,
      fields.managerId,
    );
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() fields: UpdateDepartmentDto) {
    return this.departmentsService.update(id, fields);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.departmentsService.delete(id);
  }
}

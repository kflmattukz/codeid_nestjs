import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateJobDto } from './dtos/create-job.dto';
import { UpdateJobDto } from './dtos/update-job.dto';
import { JobsService } from './jobs.service';

@Controller('api/jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  getAll() {
    return this.jobsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.jobsService.getOne(id);
  }

  @Post()
  create(@Body() fields: CreateJobDto) {
    return this.jobsService.create(
      fields.jobId,
      fields.jobTitle,
      fields.minSalary,
      fields.maxSalary,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() fields: UpdateJobDto) {
    return this.jobsService.update(id, fields);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.jobsService.delete(id);
  }
}

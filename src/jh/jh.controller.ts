import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateJhDto } from './dtos/create-jh.dto';
import { UpdateJhDto } from './dtos/update-jh.dto';
import { JhService } from './jh.service';

@Controller('api/jh')
export class JhController {
  constructor(private jhService: JhService) {}

  @Get()
  getAll() {
    return this.jhService.getAll();
  }

  @Get('employee/:id')
  getByEmployeeId(@Param('id') id: number) {
    return this.jhService.getByEmployeeId(id);
  }

  @Get('job/:id')
  getByJobId(@Param('id') id: string) {
    let jobId = id.split('_');
    jobId = jobId.map((a) => a.toUpperCase());
    id = jobId.join('_');
    return this.jhService.getByJobId(id);
  }

  @Post()
  create(@Body() fields: CreateJhDto) {
    return this.jhService.create(
      fields.employeeId,
      fields.startDate,
      fields.endDate,
      fields.jobId,
      fields.departmentId,
    );
  }

  @Patch('/:employeeid/:jobid')
  update(
    @Param('employeeid') employeeid: number,
    @Param('jobid') jobid: string,
    @Body() fields: UpdateJhDto,
  ) {
    let id = jobid.split('_');
    id = id.map((a) => a.toUpperCase());
    jobid = id.join('_');
    return this.jhService.update(employeeid, jobid, fields);
  }

  @Delete('/:employeeid/:jobid')
  async delete(
    @Param('employeeid') employeeid: number,
    @Param('jobid') jobid: string,
  ) {
    let id = jobid.split('_');
    id = id.map((a) => a.toUpperCase());
    jobid = id.join('_');
    const jh = await this.jhService.delete(employeeid, jobid);
    if (!jh) {
      return { msg: 'Delete job history failed' };
    }
    return { msg: 'Delete job history success' };
  }
}

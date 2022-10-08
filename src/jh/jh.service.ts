import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobHistory } from 'output/entities/JobHistory';
import { Repository } from 'typeorm';

@Injectable()
export class JhService {
  constructor(
    @InjectRepository(JobHistory) private jhRepo: Repository<JobHistory>,
  ) {}

  async getAll(): Promise<JobHistory[]> {
    return await this.jhRepo.find();
  }

  async getByEmployeeId(id: number): Promise<JobHistory[]> {
    return await this.jhRepo.find({ where: { employee: { employeeId: id } } });
  }

  async getByJobId(id: string): Promise<JobHistory[]> {
    return await this.jhRepo.find({ where: { job: { jobId: id } } });
  }

  async create(
    employeeId: number,
    startDate: string,
    endDate: string,
    jobId: string,
    departmentId: number,
  ): Promise<JobHistory> {
    const jh = this.jhRepo.create({
      employee: { employeeId },
      startDate,
      endDate,
      job: { jobId },
      department: { departmentId },
    });
    return await this.jhRepo.save(jh);
  }

  async update(
    employeeId: number,
    jobId: string,
    attrs: Partial<JobHistory>,
  ): Promise<JobHistory> {
    const jh = await this.checkId(employeeId, jobId);
    Object.assign(jh, attrs);
    return await this.jhRepo.save(jh);
  }

  async delete(employeeId: number, jobId: string): Promise<JobHistory> {
    const jh = await this.checkId(employeeId, jobId);
    return await this.jhRepo.remove(jh);
  }

  async checkId(employeeId: number, jobId: string): Promise<JobHistory> {
    try {
      return await this.jhRepo.findOneOrFail({
        where: { employee: { employeeId: employeeId }, job: { jobId: jobId } },
      });
    } catch (err) {
      throw new Error(
        'Job History not found, please provite employee & job id',
      );
    }
  }
}

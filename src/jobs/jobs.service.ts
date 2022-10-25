import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobs } from 'src/entities/Jobs';
import { Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(@InjectRepository(Jobs) private jobsRepo: Repository<Jobs>) {}

  async getAll(): Promise<Jobs[]> {
    return await this.jobsRepo.find({
      select: {
        jobId: true,
        jobTitle: true,
        maxSalary: true,
        minSalary: true
      }
    });
  }

  async getOne(id: string): Promise<Jobs> {
    return await this.jobsRepo.findOneByOrFail({ jobId: id });
  }

  async create(
    jobId: string,
    jobTitle: string,
    minSalary: number,
    maxSalary: number,
  ): Promise<Jobs> {
    const job = this.jobsRepo.create({
      jobId,
      jobTitle,
      minSalary,
      maxSalary,
    });
    return await this.jobsRepo.save(job);
  }

  async update(id: string, attrs: Partial<Jobs>): Promise<Jobs> {
    const job = await this.checkId(id);
    Object.assign(job, attrs);
    return this.jobsRepo.save(job);
  }

  async delete(id: string): Promise<Jobs> {
    const job = await this.checkId(id);
    return this.jobsRepo.remove(job);
  }

  private async checkId(id: string) {
    try {
      return await this.getOne(id);
    } catch (err) {
      throw new Error('Job not found, please provite the rigth id');
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countries } from 'output/entities/Countries';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Countries) private coutriesRepo: Repository<Countries>,
  ) {}

  async getAll(): Promise<Countries[]> {
    return await this.coutriesRepo.find();
  }

  async getById(id: string): Promise<Countries> {
    id = id.toUpperCase();
    try {
      const country = await this.coutriesRepo.findOneByOrFail({
        countryId: id,
      });
      return country;
    } catch (err) {
      return err;
    }
  }

  async create(
    countryId: string,
    countryName: string,
    regionId: number,
  ): Promise<Countries> {
    const country = await this.coutriesRepo.create({
      countryId,
      countryName,
      region: { regionId },
    });
    return await this.coutriesRepo.save(country);
  }

  async update(id: string, attrs: Partial<Countries>): Promise<Countries> {
    id = id.toUpperCase();
    const country = await this.getById(id);
    if (!country) {
      throw new Error('Country not found');
    }
    Object.assign(country, attrs);
    return this.coutriesRepo.save(country);
  }

  async delete(id: string): Promise<Countries> {
    id = id.toUpperCase();
    const country = await this.getById(id);
    if (!country) {
      throw new Error('Country not found, please provite the right id');
    }
    return this.coutriesRepo.remove(country);
  }
}

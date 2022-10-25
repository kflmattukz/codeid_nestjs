import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countries } from 'output/entities/Countries';
import { Repository } from 'typeorm';
import { UpdateCountryDto } from './dtos/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Countries) private coutriesRepo: Repository<Countries>,
  ) {}
  // return Promise Countries array << entity
  async getAll(): Promise<Countries[]> {
    return await this.coutriesRepo.find({
      relations: ['region'],
      select: {
        countryId: true,
        countryName: true,
        region: { regionId: true, regionName: true },
      },
    });
  }
  // return Promise Countries singular << entity
  async getById(id: string): Promise<Countries> {
    id = id.toUpperCase();
    try {
      const country = await this.coutriesRepo.findOne({
        where: { countryId: id },
        relations: ['region'],
        select: {
          countryId: true,
          countryName: true,
          region: { regionId: true },
        },
      });
      return country;
    } catch (err) {
      return err;
    }
  }

  // cuz we using save function it's gonna return Promise Countries Singular << entity
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

  async update(id: string, attrs: Partial<UpdateCountryDto>): Promise<Countries> {
    id = id.toUpperCase();
    const country = await this.getById(id); // Masukkan entity Country by Id
    // check apakah ada entity yg dikembalikan, jika tidak throw Error
    console.log(country, attrs);
    if (!country) {
      throw new Error('Country not found');
    }
    // Gabungkan entity dengan data baru
    Object.assign(country, attrs);
    // Update/save modified entity
    country.region.regionId = attrs.regionId;
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

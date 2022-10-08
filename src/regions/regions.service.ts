import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Regions } from 'src/entities/Regions';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Regions) private regionsRepository: Repository<Regions>,
  ) {}

  async getAll(): Promise<Regions[]> {
    try {
      const region = this.regionsRepository.find();
      return region;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number): Promise<Regions> {
    try {
      const region = this.regionsRepository.findOneOrFail({
        where: { regionId: id },
      });
      return region;
    } catch (error) {
      return error.message;
    }
  }

  async create(
    regionName: string,
    regionFile: string,
    regionPhoto: string,
  ): Promise<Regions> {
    try {
      const region = await this.regionsRepository.create({
        regionName,
        regionFile,
        regionPhoto,
      }); // Create a new Entity ex const region = new Region() region.regionName = 'somethig'
      return await this.regionsRepository.save(region); // Save the Enitity to DB
    } catch (err) {
      throw Error('Somtething went wrong, please try again later');
    }
  }

  async update(
    id: number,
    regionName: string,
    regionFile: string,
    regionPhoto: string,
  ) {
    try {
      const region = await this.regionsRepository.update(id, {
        regionName,
        regionFile,
        regionPhoto,
      });
      if (region) {
        return { msg: 'update region success !' };
      } else {
        return { msg: 'update region failed !' };
      }
    } catch (error) {
      return error.message;
    }
  }

  async delete(id: number) {
    try {
      const region = await this.regionsRepository.delete(id);
      if (region) {
        return { msg: 'delete region success !' };
      } else {
        return { msg: 'delete region failed !' };
      }
    } catch (error) {
      return error.message;
    }
  }
}

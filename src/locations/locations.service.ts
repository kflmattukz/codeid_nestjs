import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Locations } from 'src/entities/Locations';
import { Repository } from 'typeorm';
import { UpdateLocationDto } from './dtos/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Locations)
    private locationsRepository: Repository<Locations>,
  ) {}

  async getAll(): Promise<Locations[]> {
    return this.locationsRepository.find({
      relations: ['country'],
      select: {
        locationId: true,
        streetAddress: true,
        postalCode: true,
        city: true,
        stateProvince: true,
        country: {
          countryId: true,
          countryName: true
        }
      }
    });
  }

  async getById(id: number): Promise<Locations> {
    try {
      const location = await this.locationsRepository.findOne({ where: { locationId: id }, relations: ['country'],
      select: {
        locationId: true,
        streetAddress: true,
        postalCode: true,
        city: true,
        stateProvince: true,
        country: {
          countryId: true,
        }
      } });
      return location;
    } catch (err) {
      return err;
    }
  }

  async create(
    streetAddress: string,
    postalCode: string,
    city: string,
    stateProvince: string,
    countryId: string,
  ): Promise<Locations> {
    const location = this.locationsRepository.create({
      streetAddress,
      postalCode,
      city,
      stateProvince,
      country: { countryId },
    });
    if (!location) {
      throw new Error('Location not found, please provite the rigth id');
    }
    return this.locationsRepository.save(location);
  }

  async update(id: number, attrs: Partial<UpdateLocationDto>): Promise<Locations> {
    const location = await this.getById(id);
    if (!location) {
      throw new Error('Location not found please provite the rigth id');
    }
    Object.assign(location, attrs);
    location.country.countryId = attrs.countryId;
    return await this.locationsRepository.save(location);
  }

  async delete(id: number) {
    const location = await this.getById(id);
    if (!location) {
      throw new Error('Location not found please provite the rigth id');
    }
    return this.locationsRepository.remove(location);
  }
}

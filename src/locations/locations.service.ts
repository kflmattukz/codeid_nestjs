import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Locations } from 'src/entities/Locations';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Locations)
    private locationsRepository: Repository<Locations>,
  ) {}

  async getAll(): Promise<Locations[]> {
    return this.locationsRepository.find();
  }

  async getById(id: number): Promise<Locations> {
    try {
      const location = await this.locationsRepository.findOneByOrFail({
        locationId: id,
      });
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

  async update(id: number, attrs: Partial<Locations>): Promise<Locations> {
    const location = await this.getById(id);
    if (!location) {
      throw new Error('Location not found please provite the rigth id');
    }
    Object.assign(location, attrs);
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

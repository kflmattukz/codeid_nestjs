import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateLocationDto } from './dtos/create-location.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { LocationsService } from './locations.service';

@Controller('api/locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  getAll() {
    return this.locationsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.locationsService.getById(id);
  }

  @Post()
  create(@Body() fields: CreateLocationDto) {
    return this.locationsService.create(
      fields.streetAddress,
      fields.postalCode,
      fields.city,
      fields.stateProvince,
      fields.countryId,
    );
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() feilds: UpdateLocationDto) {
    return this.locationsService.update(id, feilds);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.locationsService.delete(id);
  }
}

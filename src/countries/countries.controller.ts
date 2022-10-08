import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dtos/create-country.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';

@Controller('api/countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Get()
  getAll() {
    return this.countriesService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.countriesService.getById(id);
  }

  @Post()
  create(@Body() fields: CreateCountryDto) {
    return this.countriesService.create(
      fields.countryId.toUpperCase(),
      fields.countryName,
      fields.regionId,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() fields: UpdateCountryDto) {
    return this.countriesService.update(id, fields);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.countriesService.delete(id);
  }
}

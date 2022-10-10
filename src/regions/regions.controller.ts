import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { RegionsService } from './regions.service';

@Controller('api/regions')
export class RegionsController {
  constructor(private regionService: RegionsService) {}

  @Get()
  getAll() {
    return this.regionService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.regionService.findOne(id);
  }

  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'regionFile' }, { name: 'regionPhoto' }]),
  )
  @Post()
  create(
    @Body('regionName') regionName: string,
    @UploadedFiles()
    files: {
      regionFile?: Express.Multer.File[];
      regionPhoto?: Express.Multer.File[];
    },
  ) {
    // const regionFile =
    //   files.regionFile[0].filename + '.' + files.regionFile[0].originalname;
    // const regionPhoto =
    //   files.regionPhoto[0].filename + '.' + files.regionPhoto[0].originalname;
    const regionFile = files.regionFile[0].originalname;
    const regionPhoto = files.regionPhoto[0].originalname;
    return this.regionService.create(regionName, regionFile, regionPhoto);
  }

  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'regionFile' }, { name: 'regionPhoto' }]),
  )
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body('regionName') regionName: string,
    @UploadedFiles()
    files: {
      regionFile?: Express.Multer.File[];
      regionPhoto?: Express.Multer.File[];
    },
  ) {
    // const regionFile =
    //   files.regionFile[0].filename + '.' + files.regionFile[0].originalname;
    // const regionPhoto =
    //   files.regionPhoto[0].filename + '.' + files.regionPhoto[0].originalname;
    const regionFile = files.regionFile[0].originalname;
    const regionPhoto = files.regionPhoto[0].originalname;
    return this.regionService.update(id, {
      regionName,
      regionFile,
      regionPhoto,
    });
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.regionService.delete(id);
  }
}

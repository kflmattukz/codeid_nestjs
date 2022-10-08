import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { multerConfig } from 'src/config/multer.config';
import { Regions } from 'src/entities/Regions';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Regions]),
    MulterModule.register(multerConfig),
  ],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobs } from 'src/entities/Jobs';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Jobs])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

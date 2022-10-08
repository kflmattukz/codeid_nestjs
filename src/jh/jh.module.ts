import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobHistory } from 'src/entities/JobHistory';
import { JhController } from './jh.controller';
import { JhService } from './jh.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobHistory])],
  controllers: [JhController],
  providers: [JhService],
})
export class JhModule {}

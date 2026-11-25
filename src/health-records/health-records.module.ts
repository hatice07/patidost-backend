import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthRecord } from '../entities/health-record.entity';
import { Pet } from '../entities/pet.entity';
import { HealthRecordsController } from './health-records.controller';
import { HealthRecordsService } from './health-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthRecord, Pet])],
  controllers: [HealthRecordsController],
  providers: [HealthRecordsService],
})
export class HealthRecordsModule {}
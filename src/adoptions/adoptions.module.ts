import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionRequest } from '../entities/adoption-request.entity';
import { Pet } from '../entities/pet.entity';
import { AdoptionsController } from './adoptions.controller';
import { AdoptionsService } from './adoptions.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdoptionRequest, Pet])],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule {}
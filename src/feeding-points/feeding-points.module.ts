import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedingPoint } from '../entities/feeding-point.entity';
import { FeedingPointsController } from './feeding-points.controller';
import { FeedingPointsService } from './feeding-points.service';

@Module({
  imports: [TypeOrmModule.forFeature([FeedingPoint])],
  controllers: [FeedingPointsController],
  providers: [FeedingPointsService],
})
export class FeedingPointsModule {}
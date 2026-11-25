import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Pet } from './entities/pet.entity';
import { AdoptionRequest } from './entities/adoption-request.entity';
import { HealthRecord } from './entities/health-record.entity';
import { FeedingPoint } from './entities/feeding-point.entity';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { AdoptionsModule } from './adoptions/adoptions.module';
import { HealthRecordsModule } from './health-records/health-records.module';
import { FeedingPointsModule } from './feeding-points/feeding-points.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'patidost.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Pet,
      AdoptionRequest,
      HealthRecord,
      FeedingPoint,
    ]),
    AuthModule,
    PetsModule,
    AdoptionsModule,
    HealthRecordsModule,
    FeedingPointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
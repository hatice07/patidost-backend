import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PetModule } from './pet/pet.module';
import { PostModule } from './post/post.module';
import { ApplicationModule } from './application/application.module';
import { ReminderModule } from './reminder/reminder.module';

// Tüm modelleri (Entity) manuel olarak içeri aktarıyoruz
import { User } from './user/entities/user.entity';
import { Pet } from './pet/entities/pet.entity';
import { Post } from './post/entities/post.entity';
import { Application } from './application/entities/application.entity';
import { Reminder } from './reminder/entities/reminder.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'patidost.sqlite', 
      entities: [User, Pet, Post, Application, Reminder], // Hatanın çözüldüğü ve tabloların bağlandığı kısım
      synchronize: true, 
    }),
    UserModule,
    PetModule,
    PostModule,
    ApplicationModule,
    ReminderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
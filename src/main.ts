import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Otomatik DTO Doğrulama ve Hata Yönetimi Entegrasyonu
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors(); // Frontend ile sorunsuz iletişim için CORS izni

  // Swagger (OpenAPI) Dokümantasyonu Ayarları
  const config = new DocumentBuilder()
    .setTitle('PatiDost API')
    .setDescription('Evcil Hayvan Sahiplendirme, Kayıp & Sağlık Takip Platformu API Dokümantasyonu')
    .setVersion('1.0')
    .addBearerAuth() // İleride eklenecek JWT Token girişi için
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  // 'api' kelimesi arayüzün hangi adreste çalışacağını belirler (localhost:3000/api)
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  
  // Terminalde gösterilecek tıklanabilir linkler
  console.log(`\n========================================================`);
  console.log(`🚀 PatiDost API Çalışıyor: http://localhost:3000`);
  console.log(`📚 Tüm API'leri Tek Yerden Görmek ve Test Etmek İçin Tıklayın: http://localhost:3000/api`);
  console.log(`========================================================\n`);
}
bootstrap();
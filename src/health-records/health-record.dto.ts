import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateHealthRecordDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  petId!: number;

  @ApiProperty({ example: 'Karma Aşı' })
  @IsString()
  @IsNotEmpty({ message: 'Aşı veya işlem adı zorunludur.' })
  vaccineName!: string;

  @ApiProperty({ example: 'İlk doz uygulandı, 21 gün sonra tekrar edilecek.' })
  @IsString()
  @IsNotEmpty({ message: 'Tedavi notu zorunludur.' })
  treatmentNote!: string;
}

export class UpdateHealthRecordDto {
  @ApiProperty({ example: 'Kuduz Aşısı', required: false })
  @IsOptional()
  @IsString()
  vaccineName?: string;

  @ApiProperty({ example: 'Yıllık aşı tamamlandı.', required: false })
  @IsOptional()
  @IsString()
  treatmentNote?: string;
}
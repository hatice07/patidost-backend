import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFeedingPointDto {
  @ApiProperty({ example: 'İncilipınar Parkı Girişi' })
  @IsString()
  @IsNotEmpty({ message: 'Başlık zorunludur.' })
  title!: string;

  @ApiProperty({ example: 'Büyük çınar ağacının yanındaki mama kabı.' })
  @IsString()
  @IsNotEmpty({ message: 'Açıklama zorunludur.' })
  description!: string;

  @ApiProperty({ example: 37.7648 })
  @IsNumber()
  latitude!: number;

  @ApiProperty({ example: 29.0865 })
  @IsNumber()
  longitude!: number;

  @ApiProperty({ example: 'FULL', enum: ['FULL', 'LOW', 'EMPTY'], required: false })
  @IsOptional()
  @IsIn(['FULL', 'LOW', 'EMPTY'], { message: 'Mama durumu FULL, LOW veya EMPTY olmalıdır.' })
  foodStatus?: string;
}

export class UpdateFeedingPointDto extends PartialType(CreateFeedingPointDto) {}
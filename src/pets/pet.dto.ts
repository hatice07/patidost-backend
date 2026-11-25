import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePetDto {
  @ApiProperty({ example: 'Tarçın' })
  @IsString()
  @IsNotEmpty({ message: 'Hayvan adı boş bırakılamaz.' })
  name!: string;

  @ApiProperty({ example: 'Köpek' })
  @IsString()
  @IsNotEmpty({ message: 'Tür alanı zorunludur.' })
  species!: string;

  @ApiProperty({ example: 2 })
  @IsInt({ message: 'Yaş tam sayı olmalıdır.' })
  @Min(0, { message: 'Yaş 0 veya daha büyük olmalıdır.' })
  age!: number;

  @ApiProperty({ example: 'Aşıları tam, sakin ve oyuncu.' })
  @IsString()
  @IsNotEmpty({ message: 'Açıklama alanı zorunludur.' })
  description!: string;
}

export class UpdatePetDto extends PartialType(CreatePetDto) {
  @ApiProperty({ example: 'AVAILABLE', enum: ['AVAILABLE', 'ADOPTED'], required: false })
  @IsOptional()
  @IsIn(['AVAILABLE', 'ADOPTED'], { message: 'Durum AVAILABLE veya ADOPTED olmalıdır.' })
  status?: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty({ example: 1, description: 'Başvurulacak hayvanın ID numarası' })
  @IsInt()
  petId!: number;

  @ApiProperty({ example: 'Bahçeli evim var, düzenli bakımını üstlenebilirim.' })
  @IsString()
  @IsNotEmpty({ message: 'Başvuru mesajı boş bırakılamaz.' })
  message!: string;
}

export class UpdateAdoptionStatusDto {
  @ApiProperty({ example: 'APPROVED', enum: ['APPROVED', 'REJECTED'] })
  @IsIn(['APPROVED', 'REJECTED'], { message: 'Durum APPROVED veya REJECTED olmalıdır.' })
  status!: string;
}
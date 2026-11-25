import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { PostType } from '../entities/post.entity';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty({ message: 'İlan başlığı boş bırakılamaz.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'İlan açıklaması boş bırakılamaz.' })
  description: string;

  @IsEnum(PostType, { message: 'Geçerli bir ilan türü seçiniz (LOST veya ADOPTION).' })
  @IsNotEmpty()
  type: PostType;

  @IsUUID('4', { message: 'Geçerli bir evcil hayvan ID (UUID) giriniz.' })
  @IsNotEmpty()
  petId: string;

  @IsNumber({}, { message: 'Enlem (latitude) bir sayı olmalıdır.' })
  @IsOptional()
  latitude?: number;

  @IsNumber({}, { message: 'Boylam (longitude) bir sayı olmalıdır.' })
  @IsOptional()
  longitude?: number;

  @IsString()
  @IsOptional()
  address?: string;
}
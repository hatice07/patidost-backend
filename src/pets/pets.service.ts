import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from '../entities/pet.entity';
import { CreatePetDto, UpdatePetDto } from './pet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  findAll() {
    return this.petRepository.find({
      relations: { owner: true, healthRecords: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const pet = await this.petRepository.findOne({
      where: { id },
     relations: { owner: true, healthRecords: true, adoptionRequests: true },
    });
    if (!pet) {
      throw new NotFoundException(`${id} numaralı hayvan ilanı bulunamadı.`);
    }
    return pet;
  }

  create(dto: CreatePetDto, userId: number) {
    const pet = this.petRepository.create({ ...dto, ownerId: userId });
    return this.petRepository.save(pet);
  }

  async update(id: number, dto: UpdatePetDto, user: { userId: number; role: string }) {
    const pet = await this.findOne(id);
    if (pet.ownerId !== user.userId && user.role !== 'ADMIN') {
      throw new ForbiddenException('Sadece kendi ilanınızı veya yönetici olarak düzenleme yapabilirsiniz.');
    }
    Object.assign(pet, dto);
    return this.petRepository.save(pet);
  }

  async remove(id: number, user: { userId: number; role: string }) {
    const pet = await this.findOne(id);
    if (pet.ownerId !== user.userId && user.role !== 'ADMIN') {
      throw new ForbiddenException('Sadece kendi ilanınızı veya yönetici olarak silebilirsiniz.');
    }
    await this.petRepository.remove(pet);
    return { message: 'İlan başarıyla silindi.' };
  }
}
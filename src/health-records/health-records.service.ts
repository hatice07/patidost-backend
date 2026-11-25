import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HealthRecord } from '../entities/health-record.entity';
import { Pet } from '../entities/pet.entity';
import { CreateHealthRecordDto, UpdateHealthRecordDto } from './health-record.dto';

@Injectable()
export class HealthRecordsService {
  constructor(
    @InjectRepository(HealthRecord)
    private healthRepository: Repository<HealthRecord>,
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  findAll() {
    return this.healthRepository.find({ relations: { pet: true }, order: { recordDate: 'DESC' } });
  }

  async create(dto: CreateHealthRecordDto, user: { userId: number; role: string }) {
    const pet = await this.petRepository.findOne({ where: { id: dto.petId } });
    if (!pet) {
      throw new NotFoundException('Sağlık kaydı eklenecek hayvan bulunamadı.');
    }
    if (pet.ownerId !== user.userId && user.role !== 'ADMIN') {
      throw new ForbiddenException('Sadece kendi ilanınızdaki hayvana sağlık kaydı ekleyebilirsiniz.');
    }
    const record = this.healthRepository.create(dto);
    return this.healthRepository.save(record);
  }

  async update(id: number, dto: UpdateHealthRecordDto, user: { userId: number; role: string }) {
    const record = await this.healthRepository.findOne({ where: { id }, relations: { pet: true } });
    if (!record) {
      throw new NotFoundException('Sağlık kaydı bulunamadı.');
    }
    if (record.pet.ownerId !== user.userId && user.role !== 'ADMIN') {
      throw new ForbiddenException('Bu sağlık kaydını düzenleme yetkiniz yok.');
    }
    Object.assign(record, dto);
    return this.healthRepository.save(record);
  }

  async remove(id: number, user: { userId: number; role: string }) {
    const record = await this.healthRepository.findOne({ where: { id }, relations: { pet: true } });
    if (!record) {
      throw new NotFoundException('Sağlık kaydı bulunamadı.');
    }
    if (record.pet.ownerId !== user.userId && user.role !== 'ADMIN') {
      throw new ForbiddenException('Bu sağlık kaydını silme yetkiniz yok.');
    }
    await this.healthRepository.remove(record);
    return { message: 'Sağlık kaydı silindi.' };
  }
}
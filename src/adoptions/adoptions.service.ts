import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdoptionRequest } from '../entities/adoption-request.entity';
import { Pet } from '../entities/pet.entity';
import { CreateAdoptionDto, UpdateAdoptionStatusDto } from './adoption.dto';

@Injectable()
export class AdoptionsService {
  constructor(
    @InjectRepository(AdoptionRequest)
    private adoptionRepository: Repository<AdoptionRequest>,
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  findAll() {
    return this.adoptionRepository.find({
     relations: { user: true, pet: true },
      order: { createdAt: 'DESC' },
    });
  }

  async create(dto: CreateAdoptionDto, userId: number) {
    const pet = await this.petRepository.findOne({ where: { id: dto.petId } });
    if (!pet) {
      throw new NotFoundException('Başvurulmak istenen hayvan ilanı bulunamadı.');
    }
    if (pet.status === 'ADOPTED') {
      throw new BadRequestException('Bu hayvan zaten sahiplendirilmiştir.');
    }
    if (pet.ownerId === userId) {
      throw new BadRequestException('Kendi oluşturduğunuz ilana sahiplenme başvurusu yapamazsınız.');
    }

    const request = this.adoptionRepository.create({
      petId: dto.petId,
      message: dto.message,
      userId,
    });
    return this.adoptionRepository.save(request);
  }

  async updateStatus(id: number, dto: UpdateAdoptionStatusDto, user: { userId: number; role: string }) {
    const request = await this.adoptionRepository.findOne({
      where: { id },
     relations: { pet: true },
    });
    if (!request) {
      throw new NotFoundException('Sahiplenme başvurusu bulunamadı.');
    }
    if (request.pet.ownerId !== user.userId && user.role !== 'ADMIN') {
      throw new ForbiddenException('Başvuruyu yalnızca ilan sahibi veya yönetici yanıtlayabilir.');
    }

    request.status = dto.status;
    await this.adoptionRepository.save(request);

    if (dto.status === 'APPROVED') {
      request.pet.status = 'ADOPTED';
      await this.petRepository.save(request.pet);
    }

    return request;
  }

  async remove(id: number, user: { userId: number; role: string }) {
    const request = await this.adoptionRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException('Başvuru bulunamadı.');
    }
    if (request.userId !== user.userId && user.role !== 'ADMIN') {
      throw new ForbiddenException('Sadece kendi başvurunuzu silebilirsiniz.');
    }
    await this.adoptionRepository.remove(request);
    return { message: 'Başvuru iptal edildi.' };
  }
}
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedingPoint } from '../entities/feeding-point.entity';
import { CreateFeedingPointDto, UpdateFeedingPointDto } from './feeding-point.dto';

@Injectable()
export class FeedingPointsService {
  constructor(
    @InjectRepository(FeedingPoint)
    private feedingRepository: Repository<FeedingPoint>,
  ) {}

  findAll() {
    return this.feedingRepository.find({ relations: { createdBy: true }, order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const point = await this.feedingRepository.findOne({ where: { id }, relations: { createdBy: true } });
    if (!point) {
      throw new NotFoundException('Besleme noktası bulunamadı.');
    }
    return point;
  }

  create(dto: CreateFeedingPointDto, userId: number) {
    const point = this.feedingRepository.create({ ...dto, createdById: userId });
    return this.feedingRepository.save(point);
  }

  async update(id: number, dto: UpdateFeedingPointDto) {
    const point = await this.findOne(id);
    Object.assign(point, dto);
    return this.feedingRepository.save(point);
  }

  async remove(id: number, user: { userId: number; role: string }) {
    const point = await this.findOne(id);
    if (point.createdById !== user.userId && user.role !== 'ADMIN') {
      throw new ForbiddenException('Sadece noktayı ekleyen kişi veya yönetici silebilir.');
    }
    await this.feedingRepository.remove(point);
    return { message: 'Besleme noktası silindi.' };
  }
}
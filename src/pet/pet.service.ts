import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto) {
    const newPet = this.petRepository.create(createPetDto);
    return await this.petRepository.save(newPet);
  }

  findAll() {
    return this.petRepository.find();
  }

  findOne(id: string) {
    return this.petRepository.findOne({ where: { id } });
  }

  update(id: string, updatePetDto: UpdatePetDto) {
    return `This action updates a #${id} pet`;
  }

  remove(id: string) {
    return `This action removes a #${id} pet`;
  }
}
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post, PostType, PostStatus } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    const { petId, type, title, description, latitude, longitude, address } = createPostDto;

    // 1. İş Kuralı Kontrolü
    if (type === PostType.LOST) {
      const existingLostPost = await this.postRepository.findOne({
        where: {
          pet: { id: petId },
          type: PostType.LOST,
          status: PostStatus.ACTIVE,
        },
      });

      if (existingLostPost) {
        throw new BadRequestException('Bu evcil hayvan için zaten aktif bir kayıp ilanı bulunmaktadır!');
      }
    }

    // 2. Yeni ilanı oluştur
    const newPost = this.postRepository.create({
      title,
      description,
      type,
      latitude,
      longitude,
      address,
      pet: { id: petId },
      user: { id: userId }, // Geçici mock kullanıcı ID'si
    });

    return await this.postRepository.save(newPost);
  }

  async findAll() {
    return await this.postRepository.find({
      relations: {
        pet: true,
        user: true,
      },
    });
  }

  async findOne(id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: {
        pet: true,
        user: true,
        applications: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`ID'si ${id} olan ilan bulunamadı.`);
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return await this.postRepository.save(post);
  }

  async remove(id: string) {
    const post = await this.findOne(id);
    return await this.postRepository.remove(post);
  }
}
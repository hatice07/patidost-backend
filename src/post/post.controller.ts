import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    // Geçici test User ID'si. Giriş (Auth) sistemi eklenince burası otomatik dolacak.
    const mockUserId = 'd553e18a-929a-4c28-98e6-1eb8a5d21a2c';
    return this.postService.create(createPostDto, mockUserId);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id); // + işareti kaldırıldı
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto); // + işareti kaldırıldı
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id); // + işareti kaldırıldı
  }
}
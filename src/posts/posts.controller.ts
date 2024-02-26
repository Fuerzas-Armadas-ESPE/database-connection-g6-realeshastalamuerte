import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { RequestLogDocument } from '../modules/request-log/request-log.shema'; // Importa el tipo de documento del esquema de registro de solicitudes

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<RequestLogDocument[]> {
    // Usa el tipo de documento del esquema de registro de solicitudes
    return this.postsService.getAllPosts();
  }
  @Get(':id')
  async getPost(@Param('id') id: string) {
      const post = await this.postsService.getPost(id);
      if (!post) {
          throw new NotFoundException('Post not found');
      }
      return post;
  }

  @Post()
  async createPost(@Body() postData: any) {
      return await this.postsService.createPost(postData);
  }

  @Put(':id')
  async updatePost(@Param('id') id: string, @Body() postData: any) {
      const updatedPost = await this.postsService.updatePost(id, postData);
      if (!updatedPost) {
          throw new NotFoundException('Post not found');
      }
      return updatedPost;
  }

  @Delete(':id')
 async deletePost(id: string): Promise<void> {
    try {
        await this.postsService.deletePost(id);
    } catch (error: any) {
        throw new InternalServerErrorException('Unable to delete post');
    }
}

}

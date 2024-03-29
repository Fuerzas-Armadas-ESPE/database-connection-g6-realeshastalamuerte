import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly postModel: Model<any>) {}

  async getAllPosts(): Promise<any[]> {
    return await this.postModel.find().exec();
  }

  async getPost(id: string): Promise<any | null> {
    return await this.postModel.findById(id).exec();
  }

  async createPost(postData: any): Promise<any> {
    try {
      const createdPost = new this.postModel(postData);
      return await createdPost.save();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updatePost(id: string, postData: any): Promise<any | null> {
    try {
      const updatedPost = await this.postModel
        .findByIdAndUpdate(id, postData, { new: true })
        .exec();
      return updatedPost;
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deletePost(id: string): Promise<void> {
    try {
      await this.postModel.findByIdAndDelete(id).exec();
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }
}

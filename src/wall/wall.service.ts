import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WallDocument } from './schemas/wall.schema';


@Injectable()
export class WallService {
  constructor(
    @InjectModel('walls')
    private readonly wallModel: Model<WallDocument>,
  ){ }

  async getWalls(room = {}){
    const walls = await this.wallModel.find(room).sort({room: 1}).select('-_id -createdAt -updatedAt')
    return walls
  }

}

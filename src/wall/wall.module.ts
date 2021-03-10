import { Module } from '@nestjs/common';
import { WallService } from './wall.service';
import { WallController } from './wall.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WallSchema } from './schemas/wall.schema';
import { PaintService } from 'src/paint/paint.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'walls', schema: WallSchema }
  ])],
  providers: [WallService, PaintService],
  controllers: [WallController]
})
export class WallModule {}

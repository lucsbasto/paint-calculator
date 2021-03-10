import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaintService } from './paint.service';

@Module({
  providers: [PaintService]
})
export class PaintModule {}

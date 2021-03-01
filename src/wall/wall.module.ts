import { Module } from '@nestjs/common';
import { WallService } from './wall.service';
import { WallController } from './wall.controller';

@Module({
  providers: [WallService],
  controllers: [WallController]
})
export class WallModule {}

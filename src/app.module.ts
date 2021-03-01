import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WallModule } from './wall/wall.module';

@Module({
  imports: [WallModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

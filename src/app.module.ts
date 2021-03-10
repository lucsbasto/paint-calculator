import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WallModule } from './wall/wall.module';
import { PaintModule } from './paint/paint.module';

const MONGOOSE_MODULE_OPTIONS: MongooseModuleOptions = {
  retryAttempts: 3,
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('DATABASE'),
      ...MONGOOSE_MODULE_OPTIONS,
    }),
    inject: [ConfigService],
  }), ConfigModule.forRoot(), WallModule, PaintModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

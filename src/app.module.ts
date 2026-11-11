import databaseConfig from './config/database.config.js';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { Info } from './info/info.entity.js'

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [databaseConfig]
    }),
    TypeOrmModule.forFeature([
      Info
    ]),
    TypeOrmModule.forRootAsync(
      databaseConfig.asProvider()
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

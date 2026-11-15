import databaseConfig from './config/database.config.js';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Seo
import { SeoController } from './seo/seo.controller.js';
import { SeoService } from './seo/seo.service.js'
import { Seo } from './seo/seo.entity.js'

// Info
import { InfoController } from './info/info.controller.js';
import { InfoService } from './info/info.service.js'
import { Info, InfoContact } from './info/info.entity.js'

// Section
import { SectionController } from './section/section.controller.js';
import { SectionService } from './section/section.service.js'
import { Section, SectionPoint } from './section/section.entity.js'

// Career
import { CareerController } from './career/career.controller.js';
import { CareerService } from './career/career.service.js'
import { Company, CompanyProject, ProjectTask } from './career/career.entity.js'

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      load: [databaseConfig]
    }),
    TypeOrmModule.forFeature([
      Seo,
      Info,
      InfoContact,
      Section,
      SectionPoint,
      Company,
      CompanyProject,
      ProjectTask
    ]),
    TypeOrmModule.forRootAsync(
      databaseConfig.asProvider()
    ),
  ],
  controllers: [
    SeoController,
    InfoController,
    SectionController,
    CareerController
  ],
  providers: [
    SeoService,
    InfoService,
    SectionService,
    CareerService
  ],
})
export class AppModule {}

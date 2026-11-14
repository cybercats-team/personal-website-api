import { Controller, Get } from '@nestjs/common';
import { SectionService } from './section.service.js';
import { Section } from './section.entity.js';

@Controller('section')
export class SectionController {
  constructor(private readonly service: SectionService) {}

  @Get()
  getAllSections(): Promise<Section[]> {
    return this.service.getAllSections();
  }
}

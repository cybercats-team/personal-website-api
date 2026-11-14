import { Controller, Get } from '@nestjs/common';
import { SectionService } from './section.service.js';

@Controller('section')
export class SectionController {
  constructor(private readonly service: SectionService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}

import { Controller, Get } from '@nestjs/common';
import { SeoService } from './seo.service.js';

@Controller('seo')
export class SeoController {
  constructor(private readonly service: SeoService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}

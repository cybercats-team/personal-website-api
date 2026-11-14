import { Controller, Get } from '@nestjs/common';
import { InfoService } from './info.service.js';

@Controller('info')
export class InfoController {
  constructor(private readonly service: InfoService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}

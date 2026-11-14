import { Controller, Get, NotFoundException } from '@nestjs/common';
import { InfoService } from './info.service.js';
import { Info } from './info.entity.js';

@Controller('info')
export class InfoController {
  constructor(private readonly service: InfoService) {}

  @Get()
  async getInfo(): Promise<Info> {
    const info = await this.service.getInfo();
    
    if (null === info) {
      throw new NotFoundException();
    }
  
    return info;
  }
}

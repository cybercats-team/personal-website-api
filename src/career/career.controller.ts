import { Controller, Get } from '@nestjs/common';
import { CareerService } from './career.service.js';

@Controller('career')
export class CareerController {
  constructor(private readonly service: CareerService) {}

  @Get()
  getHello(): string {
    return this.service.getHello();
  }
}

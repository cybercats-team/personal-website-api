import { Controller, Get } from '@nestjs/common';
import { CareerService } from './career.service.js';
import { Company } from './career.entity.js';

@Controller('career')
export class CareerController {
  constructor(private readonly service: CareerService) {}

  @Get()
  async getAllCareers(): Promise<Company[]> {
    return this.service.getAllCareers();
  }
}

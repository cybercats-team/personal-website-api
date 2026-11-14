import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './career.entity.js';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(Company)
    private repository: Repository<Company>,
  ) {}

  async getAllCareers(): Promise<Company[]> {
    return this.repository.find({
      relations: {
        projects: {
          tasks: true
        }
      }
    });
  }
}

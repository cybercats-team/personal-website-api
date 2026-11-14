import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './section.entity.js';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private repository: Repository<Section>,
  ) {}

  async getAllSections(): Promise<Section[]> {
    return this.repository.find({
      relations: {
        points: true
      }
    });
  }
}

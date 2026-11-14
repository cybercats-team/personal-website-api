import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seo } from './seo.entity.js';

@Injectable()
export class SeoService {
  constructor(
    @InjectRepository(Seo)
    private repository: Repository<Seo>,
  ) {}
  
  getHello(): string {
    return 'Hello World!';
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Info } from './info.entity.js';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info)
    private repository: Repository<Info>,
  ) {}

  async getInfo(): Promise<Info | null> {
    const [info = null] = await this.repository.find({
      relations: {
        contacts: true
      }
    });

    return info;
  }
}

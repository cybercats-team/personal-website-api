import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { SeoService } from './seo.service.js';
import { Seo } from './seo.entity.js';

@Controller('seo')
export class SeoController {
  constructor(private readonly service: SeoService) {}

  @Get()
  async getSeoTagsForRoot(): Promise<Seo> {
    return this.getSeoTags();
  }

  @Get('{*path}')
  async getSeoTags(@Param('path') path?: string[]): Promise<Seo> {
    const webpagePath = path ? path.join('/') : '/';
    const seoTags = await this.service.getByPath(webpagePath);

    if (null === seoTags) {
      throw new NotFoundException();
    }

    return seoTags;
  }
}

import 'reflect-metadata';
import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

@Controller()
class TestController {
  @Get()
  test() { return 'ok'; }
}

@Module({ controllers: [TestController] })
class TestModule {}

async function bootstrap() {
  const app = await NestFactory.create(TestModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
/*
import 'reflect-metadata'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
*/
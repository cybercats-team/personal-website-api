import { registerAs } from '@nestjs/config';
import Database from 'better-sqlite3'
import GetSharedConfig from './database.config.shared.js';

export default registerAs('database', () => ({
  ...GetSharedConfig(),
  driver: Database as any,
  autoLoadEntities: true,
}));
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { registerAs } from '@nestjs/config';
import Database from 'better-sqlite3'
import GetSharedConfig from './database.config.shared.js';

// existsSync(join(process.cwd(), 'var', 'database.sqlite'));

export default registerAs('database', () => ({
  ...GetSharedConfig(),    
  driver: Database as any,
  autoLoadEntities: true
}));
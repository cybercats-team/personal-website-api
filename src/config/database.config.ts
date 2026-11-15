import { join } from 'path';
import { existsSync } from 'fs';
import { registerAs } from '@nestjs/config';
import Database from 'better-sqlite3'
import GetSharedConfig from './database.config.shared.js';

export default registerAs('database', () => {
  const sharedConfig = GetSharedConfig();

  // Vercel hack
  if (sharedConfig.extra.readonly) {
    existsSync(join(
      process.cwd(), 
      'var', 
      'database.sqlite'
    ));
  }

  return {
    ...sharedConfig,
    driver: Database as any,
    autoLoadEntities: true
  }
});
import { join } from 'path';
import { existsSync } from 'fs';
import { registerAs } from '@nestjs/config';
import Database from 'better-sqlite3'
import GetSharedConfig from './database.config.shared.js';

export default registerAs('database', () => {
  const sharedConfig = GetSharedConfig();  
  const isVercel = ['1', 'true'].includes(process.env.VERCEL ?? 'false');
  let vercelConfig = {};
  
  // Vercel hack
  if (isVercel) {
    existsSync(join(process.cwd(),  'var',  'database.sqlite'));

    vercelConfig = {
      driver: Database as any,
      // database: '/var/task/var/database.sqlite',
      extra: { readonly: true, fileMustExist: true }
    };
  }
  
  return {
    ...sharedConfig,    
    ...vercelConfig,
    autoLoadEntities: true
  }
});
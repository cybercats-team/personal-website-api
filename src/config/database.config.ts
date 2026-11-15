import * as pg from 'pg';
import { registerAs } from '@nestjs/config';
import GetSharedConfig from './database.config.shared.js';

export default registerAs('database', () => ({
  ...GetSharedConfig(),    
  driver: pg,
  autoLoadEntities: true
}));
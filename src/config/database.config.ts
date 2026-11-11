import { registerAs } from '@nestjs/config';
import GetSharedConfig from './database.config.shared.js';

export default registerAs('database', () => ({
  ...GetSharedConfig(),
  autoLoadEntities: true,
}));
import type { DataSourceOptions } from 'typeorm';

export default (): DataSourceOptions => ({ 
  url: process.env.DATABASE_URL ?? '',
  type: 'postgres', 
  synchronize: false
})
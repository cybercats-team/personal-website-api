import type { DataSourceOptions } from 'typeorm';

export default (): DataSourceOptions => ({ 
  database: process.env.DATABASE_PATH ?? 'var/database.sqlite', 
  type: 'better-sqlite3', 
  synchronize: false
})

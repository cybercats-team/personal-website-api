import type { DataSourceOptions } from 'typeorm';

export default (): DataSourceOptions => ({ 
  database: 'var/database.sqlite', 
  type: 'better-sqlite3', 
  synchronize: false
})
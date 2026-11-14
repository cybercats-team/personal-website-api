import type { DataSourceOptions } from 'typeorm';

export default (forCli: boolean = false): DataSourceOptions => ({
  type: 'better-sqlite3',
  database: process.env.DATABASE_PATH ?? 'var/database.sqlite',  
  synchronize: false,
})
 
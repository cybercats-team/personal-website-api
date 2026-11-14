import type { DataSourceOptions } from 'typeorm';

export default (forCli: boolean = false): DataSourceOptions => {
  const database = process.env.DATABASE_PATH ?? 'var/database.sqlite';

  console.info('Using database path: ', database);
  return { database,  type: 'better-sqlite3', synchronize: false };
}

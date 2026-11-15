import type { DataSourceOptions } from 'typeorm';

export default (forCli: boolean = false): DataSourceOptions => {
  const database = process.env.DATABASE_PATH ?? 'var/database.sqlite';
  const readonly = "true" == (process.env.DATABASE_READONLY ?? 'false')

  console.info({ 'Using database path': database, 'R/O': readonly });
  return { 
    database, 
    type: 'better-sqlite3', 
    synchronize: false,
    extra: {
      readonly,
      fileMustExist: readonly
    }
  };
}

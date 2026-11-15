import type { DataSourceOptions } from 'typeorm';

export default (): DataSourceOptions => {  
  const readOnly = 'true' == (process.env.DATABASE_READONLY ?? 'false');

  return { 
    database: process.env.DATABASE_PATH ?? 'var/database.sqlite', 
    type: 'better-sqlite3', 
    synchronize: false,
    extra: {
      readonly: readOnly,
      fileMustExist: readOnly
    }
  };
}

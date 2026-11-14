import { DataSource, type DataSourceOptions } from 'typeorm';
import { type SeederOptions } from 'typeorm-extension';
import GetSharedConfig from '../src/config/database.config.shared.js';

try { 
  process.loadEnvFile();
} catch {
  console.warn('No .env file found. Using environment variables instead.')
}

const options: DataSourceOptions & SeederOptions = {
  ...GetSharedConfig(),
  entities:   ['src/**/*.entity.{ts,js}'],
  migrations: ['database/migrations/*.{ts,js}'],
  seeds:      ['database/seeds/*{.ts,.js}'],
  factories:  ['database/factories/*{.ts,.js}'],
  migrationsRun: false,
  migrationsTableName: "migrations",
  migrationsTransactionMode: "all",
};

export default new DataSource(options);
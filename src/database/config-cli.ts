import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

const config: DataSourceOptions = {
  database: 'apisamples.db.sql',
  entities: [join(__dirname, '/entities/**/*{.ts,.js}')],
  logging: true,
  synchronize: false,
  type: 'sqlite',
};

const configSeeder = {
  defaultSeeder: 'RootSeeder',
  seeders: ['./src/database/seeders/*.ts'],
};

export { config, configSeeder };

export default new DataSource({ ...config, ...configSeeder });

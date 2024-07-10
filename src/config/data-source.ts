import { join } from 'path'
import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  migrations: [join(__dirname, '../database/migration/*.{ts, js}')],
  entities: [join(__dirname, '../entity/*.entity.{ts, js}')],
  synchronize: false
})
// Create migrate: ts-node node_modules/.bin/typeorm migration:generate -d src/config/data-source.ts src/database/migration/initDatabase
// Run migrate: ts-node node_modules/.bin/typeorm migration:run -d src/config/data-source.ts

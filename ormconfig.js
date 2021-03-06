const path = require('path');

const {
  NODE_ENV,
} = process.env;

require('dotenv').config({
  path: path.resolve(process.cwd(), NODE_ENV === 'development' ? '.env.dev' : '.env'),
});

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  synchronize: false,
  logging: false,
  entities: ['src/entity/**/*.ts', 'entity/*.js'],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};
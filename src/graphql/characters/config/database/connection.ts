// Code: This file is responsible for creating a connection to the database using the Sequelize ORM. It uses the environment variables to connect to the database.
import { env } from '../dotenv';
import { Sequelize } from 'sequelize';

export const sequelizeConnection = new Sequelize({
  dialect: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});
import dotenv from 'dotenv';

dotenv.config();

export const env = {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT || '5432'),
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.PORT || parseInt(process.env.PORT || '4000'),
};

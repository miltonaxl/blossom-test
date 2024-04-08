// This file is used to configure the database connection

const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.DB_PASSWORD);

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "rickandmorty2",
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  },
  // "test": {
  //   "username": process.env.DB_USERNAME,
  //   "password": process.env.DB_PASSWORD,
  //   "database": process.env.DB_DATABASE,
  //   "host": process.env.DB_HOST,
  //   "dialect": "postgres",
  //   "ssl": true

  // }
}

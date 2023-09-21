/* eslint-disable @typescript-eslint/no-var-requires */

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME || 'ad-m11',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || 'nest-postgre',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT || '5432',
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

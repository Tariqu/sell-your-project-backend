require('dotenv').config({ path: `${process.cwd()}/.env` });

module.exports = {
  development: {
    username: process.env.DEV_DATABASE_USER_NAME,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_NAME,
    host: process.env.DEV_DATABASE_HOST,
    port: process.env.DEV_DATABASE_PORT,
    seederStorage: 'sequelize',
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DATABASE_USER_NAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    host: process.env.TEST_DATABASE_HOST,
    port: process.env.TEST_DATABASE_PORT,
    seederStorage: 'sequelize',
    dialect: 'postgres',
  },
  production: {
    username: process.env.PROD_DATABASE_USER_NAME,
    password: process.env.PROD_DATABASE_PASSWORD,
    database: process.env.PROD_DATABASE_NAME,
    host: process.env.PROD_DATABASE_HOST,
    port: process.env.PROD_DATABASE_PORT,
    seederStorage: 'sequelize',
    dialect: 'postgres',
  },
};

import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { connection, sequelize };
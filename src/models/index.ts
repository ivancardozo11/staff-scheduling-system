import { Sequelize, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

//connection configuration
export const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: 3306,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
});


//authenticates the database
sequelize.authenticate()
.then(() => {
  console.log('Connection to the database successfull !!');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

export { DataTypes };
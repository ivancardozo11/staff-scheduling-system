import { Sequelize, DataTypes } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

export class Database {
  public sequelize: Sequelize;

  public dataTypes: typeof DataTypes;

  constructor() {

    this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      port: 3306,
      dialect: 'mysql',
      define: {
        timestamps: false,
      },
    });
    this.dataTypes = DataTypes;
  }
}
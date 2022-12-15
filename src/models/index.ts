import { Sequelize, DataTypes } from 'sequelize';

// Define the Database class
export class Database {
  // The sequelize object for interacting with the database
  public sequelize: Sequelize;

  // The DataTypes object for defining model attributes
  public dataTypes: typeof DataTypes;

  // Constructor for initializing the database
  constructor() {
    // Initialize the sequelize object
    this.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      port: 3306,
      dialect: 'mysql',
      define: {
        timestamps: false,
      },
    });
    // Initialize the DataTypes object
    this.dataTypes = DataTypes;
  }
}
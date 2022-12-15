import { Database } from './index';
import rolesModel from './rolesModel';

const db = new Database();

// Define the users model
const userModel = db.sequelize.define('User', {
  // Define the user's attributes
  id: {
    type: db.dataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: db.dataTypes.STRING,
    allowNull: false
  },
  username: {
    type: db.dataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: db.dataTypes.STRING,
    allowNull: false
  },
  role_id: {
    type: db.dataTypes.INTEGER,
    allowNull: false,
    references: {
      model: rolesModel,
      key: 'id'
    }
  }
}, {
  // Additional options for the model
  timestamps: false,
  underscored: true,
  tableName: 'users'
});

export default userModel;

import { sequelize, DataTypes } from './index';
import rolesModel from './rolesModel';

// Define the users model
const userModel = sequelize.define('User', {
  // Define the user's attributes
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role_id: {
    type: DataTypes.INTEGER,
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

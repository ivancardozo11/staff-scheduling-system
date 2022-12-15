import { Database } from './index';
import rolesModel from './rolesModel';

const db = new Database();

// Define the user's attributes
const userModel = db.sequelize.define('User', {
  id: {
    type: db.dataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // Specify the column name for the `name` attribute
  name: {
    type: db.dataTypes.STRING,
    allowNull: false,
    field: 'name'
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

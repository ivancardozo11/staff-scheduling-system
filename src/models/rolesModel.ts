import { Database } from './index';

const db = new Database();

// Define the roles model
const Role = db.sequelize.define('Role', {
  id: {
    type: db.dataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: db.dataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: db.dataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true,
  tableName: 'roles'
});

export default Role;

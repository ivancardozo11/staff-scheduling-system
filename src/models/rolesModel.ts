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

const createDefaultRoles = async () => {
  // Check if the user role exists
  let userRole = await Role.findOne({ where: { name: 'user' } });
  if (!userRole) {
    // Create the user role
    userRole = await Role.create({
      name: 'user',
      description: 'A regular user'
    });
  }

  // Check if the admin role exists
  let adminRole = await Role.findOne({ where: { name: 'admin' } });
  if (!adminRole) {
    // Create the admin role
    adminRole = await Role.create({
      name: 'admin',
      description: 'An administrator'
    });
  }
};

// Create the default roles when the roles model is imported
createDefaultRoles();

export default Role;

import { Database } from './index';

const db = new Database();

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
  let userRole = await Role.findOne({ where: { name: 'user' } });
  if (!userRole) {
    userRole = await Role.create({
      name: 'user',
      description: 'A regular user'
    });
  }

  let adminRole = await Role.findOne({ where: { name: 'admin' } });
  if (!adminRole) {
    adminRole = await Role.create({
      name: 'admin',
      description: 'An administrator'
    });
  }
};

createDefaultRoles();

export default Role;

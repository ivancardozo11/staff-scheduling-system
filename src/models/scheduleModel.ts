import { sequelize, DataTypes } from './index';
import userModel from './userModel';

// Define the schedule model
const scheduleModel = sequelize.define('Schedule', {
  // Define the schedule's attributes
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: userModel,
      key: 'id'
    }
  },
  work_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  shift_length: {
    type: DataTypes.TIME,
    allowNull: false
  },
  work_hours: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true,
  tableName: 'schedules'
});

export default scheduleModel;

import { Database } from './index'
import userModel from './userModel';

const db = new Database();

// Define the schedule model
const scheduleModel = db.sequelize.define('Schedule', {
  // Define the schedule's attributes
  id: {
    type: db.dataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: db.dataTypes.INTEGER,
    allowNull: false,
    references: {
      model: userModel,
      key: 'id'
    }
  },
  work_date: {
    type: db.dataTypes.DATE,
    allowNull: false
  },
  shift_length: {
    type: db.dataTypes.TIME,
    allowNull: false
  },
  work_hours: {
    type: db.dataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: false,
  underscored: true,
  tableName: 'schedules'
});

export default scheduleModel;

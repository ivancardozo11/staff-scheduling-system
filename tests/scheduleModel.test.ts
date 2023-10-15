import { Database } from '../src/models';
import scheduleModel from '../src/models/scheduleModel';

const db = new Database();

describe('scheduleModel', () => {
  it('should correctly validate input data', () => {
    const schedule = scheduleModel.build({
      user_id: 'invalid user_id',
      work_date: 'invalid work_date',
      shift_length: 'invalid shift_length',
      work_hours: 'invalid work_hours'
    });

    return schedule.save().catch((error) => {
      expect(error).toBeDefined();
      expect(error.name).toBe('SequelizeValidationError');
      expect(error.errors).toHaveLength(4);
      expect(error.errors[0].path).toBe('user_id');
      expect(error.errors[0].message).toBe('user_id must be a number');
      expect(error.errors[1].path).toBe('work_date');
      expect(error.errors[1].message).toBe('work_date must be a valid date');
      expect(error.errors[2].path).toBe('shift_length');
      expect(error.errors[2].message).toBe('shift_length must be a valid time');
      expect(error.errors[3].path).toBe('work_hours');
      expect(error.errors[3].message).toBe('work_hours must be a number');
    });
  });

  describe('scheduleModel', () => {
    it('should have the correct table name', () => {
      expect(scheduleModel.getTableName()).toBe('schedules');
    });
  });

});
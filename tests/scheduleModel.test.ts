import { Database } from '../src/models';
import scheduleModel from '../src/models/scheduleModel';

const db = new Database();

/* This test is checking that the scheduleModel correctly validates input data before attempting to save it to the database. 
It does this by creating a new instance of scheduleModel with invalid data and then attempting to save it to the database. 
If the save fails, the test expects that it will fail due to validation errors and checks that the correct error messages are returned. */

describe('scheduleModel', () => {
  it('should correctly validate input data', () => {
    // Create a new scheduleModel instance with invalid data
    const schedule = scheduleModel.build({
      user_id: 'invalid user_id',  // Should be an integer
      work_date: 'invalid work_date',  // Should be a date
      shift_length: 'invalid shift_length',  // Should be a time
      work_hours: 'invalid work_hours'  // Should be a float
    });

    // Attempt to save the scheduleModel instance to the database
    return schedule.save().catch((error) => {
      // Expect the save to fail due to validation errors
      expect(error).toBeDefined();
      expect(error.name).toBe('SequelizeValidationError');
      expect(error.errors).toHaveLength(4);

      // Check that the correct error messages are returned
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
/* This test does not require any setup or tear-down of test data, and does not involve interacting with the database. 
It simply verifies that the scheduleModel has the correct table name. */
  describe('scheduleModel', () => {
    it('should have the correct table name', () => {
      expect(scheduleModel.getTableName()).toBe('schedules');
    });
  });

});
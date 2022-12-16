import userModel from '../src/models/userModel';
import rolesModel from '../src/models/rolesModel';

describe('userModel', () => {
  // Test that the userModel has the correct attributes
  test('should have the correct attributes', () => {
    expect(Object.keys(userModel.rawAttributes)).toEqual([
      'id',
      'name',
      'username',
      'password',
      'role_id'
    ]);
  });

  // Test that the userModel is correctly associated with the roles model
  test('should be correctly associated with roles model', () => {
    expect(userModel.associations.Role).toEqual(rolesModel);
  });

  // Test that the userModel has the correct options for timestamps and underscored
  test('should have correct options for timestamps and underscored', () => {
    expect(userModel.options.timestamps).toBe(false);
    expect(userModel.options.underscored).toBe(true);
  });

  // Test that the id attribute is set as the primary key for the userModel
  test('should have id attribute as primary key', () => {
    expect(userModel.primaryKeyAttributes).toEqual(['id']);
  });
});
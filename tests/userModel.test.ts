import userModel from '../src/models/userModel';
import rolesModel from '../src/models/rolesModel';

describe('userModel', () => {
  test('should have the correct attributes', () => {
    expect(Object.keys(userModel.rawAttributes)).toEqual([
      'id',
      'name',
      'username',
      'password',
      'role_id'
    ]);
  });

  test('should be correctly associated with roles model', () => {
    expect(userModel.associations.Role).toEqual(rolesModel);
  });

  test('should have correct options for timestamps and underscored', () => {
    expect(userModel.options.timestamps).toBe(false);
    expect(userModel.options.underscored).toBe(true);
  });
  test('should have id attribute as primary key', () => {
    expect(userModel.primaryKeyAttributes).toEqual(['id']);
  });
});
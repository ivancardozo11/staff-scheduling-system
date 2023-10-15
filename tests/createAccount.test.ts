import request from 'supertest';
import app from '../index';
import userModel from '../src/models/userModel';

describe('UserController', () => {
  describe('POST /createAccount', () => {
    it('should return a 201 status code and a success response when a new user account is created successfully', async () => {
      const res = await request(app)
        .post('/createAccount')
        .send({ name: 'John', username: 'john', password: 'password', role: 'user' });

      expect(res.status).toBe(201);

      expect(res.body).toEqual({
        success: true,
        message: 'Account created successfully.',
        data: {
          id: expect.any(Number),
          name: 'John',
          username: 'john',
          role_id: expect.any(Number)
        }
      });
    });
  });
});

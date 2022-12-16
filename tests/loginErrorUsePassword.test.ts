import request from 'supertest';
import app from '../index';


describe('UserController', () => {
  describe('POST /login', () => {
    it('should return a 200 status code and a success response with the user data and a token when the login is successful', async (done) => {
      const res = await request(app)
        .post('/login')
        .send({
          username: 'john',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('username');
      expect(res.body).toHaveProperty('role_id');
      expect(res.body).toHaveProperty('token');
      done();
    });
  });
});

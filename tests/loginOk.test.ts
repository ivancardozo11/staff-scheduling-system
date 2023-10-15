import request from 'supertest';
import app from '../index';

describe('UserController', () => {
    it('POST /login should return a 200 status code and a success response with the user\'s data and a JSON Web Token when the login is successful', async (done) => {
      const res = await request(app)
        .post('/login')
        .send({
          username: 'john',
          password: 'password'
        });
  
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('username');
      expect(res.body).toHaveProperty('role_id');
      expect(res.body).toHaveProperty('token');
  
      done();
    });
  });
  
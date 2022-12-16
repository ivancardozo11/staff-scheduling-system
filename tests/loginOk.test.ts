import request from 'supertest';
import app from '../index';

describe('UserController', () => {
    it('POST /login should return a 200 status code and a success response with the user\'s data and a JSON Web Token when the login is successful', async (done) => {
      // Send a POST request to the login route with the correct username and password
      const res = await request(app)
        .post('/login')
        .send({
          username: 'john',
          password: 'password'
        });
  
      // Expect the status code to be 200
      expect(res.status).toBe(200);
      // Expect the response body to have a success property set to true
      expect(res.body.success).toBe(true);
      // Expect the response body to contain the user's data
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('username');
      expect(res.body).toHaveProperty('role_id');
      // Expect the response body to contain a JSON Web Token
      expect(res.body).toHaveProperty('token');
  
      done();
    });
  });
  
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateJWT = (payload: object, secret: string, options: object = {}) => {
  if (!secret || typeof secret !== 'string') {
    throw new Error('JWT secret must have a value and be of type string');
  }
  const token = jwt.sign(payload, secret, options);

  return token;
}

export default generateJWT;
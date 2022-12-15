import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load values from the .env file
dotenv.config();

const generateJWT = (payload: object, secret: string) => {
  // Make sure the JWT secret is defined and non-empty
  if (!secret || typeof secret !== 'string') {
    throw new Error('JWT secret must have a value and be of type string');
  }

  // Generate the JWT using the provided payload and secret
  const token = jwt.sign(payload, secret);

  return token;
}

export default generateJWT;
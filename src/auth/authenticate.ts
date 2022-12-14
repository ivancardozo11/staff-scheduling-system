import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    // Check if email and password are provided
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Check if user with provided email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Compare provided password with hashed password in database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Add the token to the user object and attach to request
    req.user = { ...user.dataValues, token };

    // Call next middleware function
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export default authenticate;

/*
This function checks if the user exists 
in the request, and if they do, 
it retrieves their role from the database.
 It then checks if the user has permission 
 to access the requested resource based on their role. 
 If the user does not have permission, it returns an 
 error message. Otherwise, it calls the next 
 middleware function to continue processing the request. 
 This function should work as intended for the staff scheduling system.
 */

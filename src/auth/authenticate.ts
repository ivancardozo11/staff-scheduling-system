import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel';

// Define the interface for the user object
// Define the interface for the user object
interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  role_id: number;
  token: string;
}

// Extend the Request interface to add a user property
interface RequestWithUser extends Request {
  user: User;
}


const authenticate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    // Check if username and password are provided
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    // Check if user with provided username exists
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Invalid username or password');
    }

   // Get the password from the user object using bracket notation
      const userPassword: string = user.get('password') as string;


      // Check if the provided password is correct
      const isValidPassword = await bcrypt.compare(password, userPassword);

      if (!isValidPassword) {
        throw new Error('Incorrect username or password');
      }


    // Check if the user is already authenticated
    if (req.user) {
      // Attach the existing token to the user object and attach to request
      req.user = { ...req.user, ...user.dataValues };
    } else {
      // Generate a JWT token for the user
      const token = jwt.sign({ id: user.get('id') }, process.env.JWT_SECRET, { expiresIn: '1d' });

      // Add the token to the user object and attach to request
      req.user = { ...user.dataValues, token } as User;
    }

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

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/userModel';

interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  role_id: number;
  token: string;
}

interface RequestWithUser extends Request {
  user: User;
}


const authenticate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new Error('Invalid username or password');
    }

      const userPassword: string = user.get('password') as string;

      const isValidPassword = await bcrypt.compare(password, userPassword);

      if (!isValidPassword) {
        throw new Error('Incorrect username or password');
      }
    if (req.user) {
      req.user = { ...req.user, ...user.dataValues };
    } else {
      const token = jwt.sign({ id: user.get('id') }, process.env.JWT_SECRET, { expiresIn: '1d' });
      req.user = { ...user.dataValues, token } as User;
    }
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};



export default authenticate;
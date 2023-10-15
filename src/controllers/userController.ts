import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import generateJWT from '../../helpers/generateJWT'
import userModel from '../models/userModel';
import scheduleModel from '../models/scheduleModel';
import rolesModel from '../models/rolesModel';
import { Op } from 'sequelize';



  const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.name || !req.body.username || !req.body.password || !req.body.role) {
      throw new Error('Name, username, password, and role are required.');
    }

    const roleModel = await rolesModel.findOne({ where: { name: req.body.role } });
    if (!roleModel) {
      throw new Error('The specified role does not exist.');
    }

    if (req.body.role !== 'user' && req.body.role !== 'admin') {
      throw new Error('The specified role is invalid. It must be either "user" or "admin".');
    }
    const user = await userModel.findOne({ where: { username: req.body.username } });
    if (user) {
      throw new Error('A user with the specified username already exists.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await userModel.create({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
      role_id: roleModel.get('id')
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      data: {
        id: newUser.get('id'),
        name: newUser.get('name'),
        username: newUser.get('username'),
        role_id: newUser.get('role_id')
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }

  next();
};


const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const { username, password } = req.body;
  const user = await userModel.findOne({ where: { username } });

if (!user) {
  throw new Error('Incorrect username or password');
}

const userPassword: string = user.get('password') as string;

const isValidPassword = await bcrypt.compare(password, userPassword);

if (!isValidPassword) {
  throw new Error('Incorrect username or password');
}

const token = generateJWT({ id: user.get('id') }, process.env.JWT_SECRET, {
  expiresIn: 86400
});

res.json({
  id: user.get('id'),
  name: user.get('name'),
  username: user.get('username'),
  role_id: user.get('role_id'),
  token
});

} catch (err) {
  
  return res.status(500).json({
  success: false,
  message: err.message
  });
  }
  
  next();
  };


  const viewSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Get the user ID from the request parameters
      const userId = req.params.userId;
  
      // Check if a user with the given ID exists
      const user = await userModel.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found.');
      }
  
      // Check if the authenticated user is authorized to view the schedule
      // This could be done using the user's role, or by checking if the authenticated user's ID matches the user ID in the request parameters
      if (req.body.userId !== userId && user.get('role_id') !== 2) {
        throw new Error('Unauthorized to view schedule.');
      }
  
      // Get the start and end dates from the request query parameters
      const startDate = new Date((req.query.start as string));
      const endDate = new Date((req.query.end as string));
      
  
      // Check if the start and end dates are valid
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid start or end date');
      }
  
      // Calculate the difference between the start and end dates in days
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      // Check if the difference between the start and end dates is more than 365 days
      if (diffDays > 365) {
        throw new Error('You can only view your schedule for a period of time up to 1 year');
      }
  
      // Find the user's schedule for the specified period of time
      const schedule = await scheduleModel.findAll({
        where: {
          user_id: userId,
          work_date: {
            $between: [startDate, endDate]
          }
        }
      });
  
      // Return the user's schedule as the response
      res.json(schedule);
    } catch (err) {
      // If there was an error, return a failure response
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
  
    // Call the next middleware in the route
    next();
  };

const viewCoworkerSchedules = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
  
      const schedules = await scheduleModel.findAll({
        where: {
          user_id: {
            [Op.ne]: userId
          }
        }
      });
  
      res.json(schedules);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }
    next();
  };
  
  
  


  
export default { 
     createAccount,
     login,
     viewSchedule,
     viewCoworkerSchedules
    };

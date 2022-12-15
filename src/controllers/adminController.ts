import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import scheduleModel from '../models/scheduleModel';
import { Model } from 'sequelize';

// Define the createSchedule method
const createSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the user_id, work_date, shift_length, and work_hours from the request body
      const { user_id, work_date, shift_length, work_hours } = req.body;
  
      // Retrieve the user with the specified user_id
      const user = await userModel.findByPk(user_id);
  
      // If the user does not exist, return an error
      if (!user) {
        return res.status(404).send({
          error: 'User not found'
        });
      }
  
      // Create a new schedule for the user
      const schedule = await scheduleModel.create({
        user_id,
        work_date,
        shift_length,
        work_hours
      });
  
      // Return the newly created schedule
      return res.send(schedule);
    } catch (error) {
      // Handle any errors that occurred during the execution of the method
      return res.status(500).send({
        error: 'Failed to create schedule'
      });
    }
  
    // Call the next middleware function
    next();
  };

// Define the updateSchedule method
const updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract the user_id and work_date from the request body
      const { user_id, work_date } = req.body;
  
      // Retrieve the user with the specified user_id
      const user = await userModel.findByPk(user_id);
  
      // If the user does not exist, return an error
      if (!user) {
        return res.status(404).send({
          error: 'User not found'
        });
      }
  
      // Retrieve the user's schedule
      const schedule = await scheduleModel.findOne({
        where: {
          user_id
        }
      });
  
      // If the schedule does not exist, return an error
      if (!schedule) {
        return res.status(404).send({
          error: 'Schedule not found'
        });
      }
  
      // Update the schedule with the new work_date
      schedule.update({
        work_date
      });
  
      // Return the updated schedule
      return res.send(schedule);
    } catch (error) {
      // Handle any errors that occurred during the execution of the method
      return res.status(500).send({
        error: 'Failed to update schedule'
      });
    }
  
    // Call the next middleware function
    next();
  };

// Define the deleteSchedule method
const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the user_id from the request body
    const { user_id } = req.body;

    // Retrieve the user with the specified user_id
    const user = await userModel.findByPk(user_id);

    // If the user does not exist, return an error
    if (!user) {
      return res.status(404).send({
        error: 'User not found'
      });
    }

    // Retrieve the user's schedule
    const schedule = await scheduleModel.findOne({
      where: {
        user_id
      }
    });

    // If the schedule does not exist, return an error
    if (!schedule) {
      return res.status(404).send({
        error: 'Schedule not found'
      });
    }

    // Delete the user's schedule
    await schedule.destroy();

    // Return a success message
    return res.send({
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    // Handle any errors that occurred during the execution of the method
    return res.status(500).send({
      error: 'Failed to delete schedule'
    });
}

// Call the next middleware function
next(); 
};
 



// Define a type for the user objects that includes a schedules property
type User = {
// Other properties
schedules: Schedule[];
}

// Define a type for the schedule objects
type Schedule = {
work_hours: number;
// Other properties
}

// Define the orderUsersByWorkHours method
const orderUsersByWorkHours = async (req: Request, res: Response) => {
    try {
      // Retrieve all users and their schedules
      const users: Model<User, any>[] = await userModel.findAll({
        include: [
          {
            model: scheduleModel
          }
        ]
      });
  
      // Order the users by the accumulated work hours of their schedules
      const orderedUsers = users.sort((a, b) => {
        // Calculate the total work hours for each user
        const totalWorkHoursA = a.dataValues.schedules.reduce((acc, schedule) => acc + schedule.work_hours, 0);
        const totalWorkHoursB = b.dataValues.schedules.reduce((acc, schedule) => acc + schedule.work_hours, 0);
  
        // Return the difference between the total work hours of the two users
        return totalWorkHoursB - totalWorkHoursA;
      });
  
      // Return the ordered list of users
      return res.send(orderedUsers);
    } catch (error) {
      // Handle any errors that occurred during the execution of the method
      return res.status(500).send({
        error: 'Failed to order users by work hours'
      });
    }
  };
  
  
export default {
    createSchedule,
    updateSchedule,
    deleteSchedule,
    orderUsersByWorkHours
};
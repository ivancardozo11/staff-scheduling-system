import { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import scheduleModel from '../models/scheduleModel';
import { Model } from 'sequelize';

const createSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, work_date, shift_length, work_hours } = req.body;
  
      const user = await userModel.findByPk(user_id);
  
      if (!user) {
        return res.status(404).send({
          error: 'User not found'
        });
      }
  
      const schedule = await scheduleModel.create({
        user_id,
        work_date,
        shift_length,
        work_hours
      });

      return res.send(schedule);
    } catch (error) {

      return res.status(500).send({
        error: 'Failed to create schedule'
      });
    }
    next();
  };

const updateSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user_id, work_date } = req.body;
  
      const user = await userModel.findByPk(user_id);
  
      if (!user) {
        return res.status(404).send({
          error: 'User not found'
        });
      }
  
      const schedule = await scheduleModel.findOne({
        where: {
          user_id
        }
      });
  
      if (!schedule) {
        return res.status(404).send({
          error: 'Schedule not found'
        });
      }

      schedule.update({
        work_date
      });
  
      return res.send(schedule);
    } catch (error) {
      return res.status(500).send({
        error: 'Failed to update schedule'
      });
    }
    next();
  };

const deleteSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.body;

    const user = await userModel.findByPk(user_id);

    if (!user) {
      return res.status(404).send({
        error: 'User not found'
      });
    }

    const schedule = await scheduleModel.findOne({
      where: {
        user_id
      }
    });

    if (!schedule) {
      return res.status(404).send({
        error: 'Schedule not found'
      });
    }

    await schedule.destroy();

    return res.send({
      message: 'Schedule deleted successfully'
    });
  } catch (error) {
    return res.status(500).send({
      error: 'Failed to delete schedule'
    });
}

next(); 
};
 



type User = {
schedules: Schedule[];
}

type Schedule = {
work_hours: number;
}

const orderUsersByWorkHours = async (req: Request, res: Response) => {
    try {
      const users: Model<User, any>[] = await userModel.findAll({
        include: [
          {
            model: scheduleModel
          }
        ]
      });
  
      const orderedUsers = users.sort((a, b) => {
        const totalWorkHoursA = a.dataValues.schedules.reduce((acc, schedule) => acc + schedule.work_hours, 0);
        const totalWorkHoursB = b.dataValues.schedules.reduce((acc, schedule) => acc + schedule.work_hours, 0);
  
        return totalWorkHoursB - totalWorkHoursA;
      });
  
      return res.send(orderedUsers);
    } catch (error) {
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
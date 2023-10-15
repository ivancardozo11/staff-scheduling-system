import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import Role from '../models/rolesModel';



const authorize = (roleName: string) => async (req: Request, res: Response, next:NextFunction) => {
  try {
    const user = req.body.user;
    if (!user) {
      throw new Error('You must be logged in to access this resource');
    }
    const role = await Role.findOne({ where: { id: user.roleId } });
    if (!role) {
      throw new Error('Invalid role for user');
    }

    if (role.get('name') !== roleName) {
      throw new Error('You do not have permission to access this resource');
    }
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export default authorize;


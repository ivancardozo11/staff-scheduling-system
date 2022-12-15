import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import Role from '../models/rolesModel';



const authorize = (roleName: string) => async (req: Request, res: Response, next:NextFunction) => {
  try {
    // Get the user from the request
    const user = req.body.user;

    // Check if user exists
    if (!user) {
      throw new Error('You must be logged in to access this resource');
    }

    // Get the user's role from the database
    const role = await Role.findOne({ where: { id: user.roleId } });
    if (!role) {
      throw new Error('Invalid role for user');
    }

    // Check if the user has permission to access the requested resource
    if (role.get('name') !== roleName) {
      throw new Error('You do not have permission to access this resource');
    }

    // Call next middleware function
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
export default authorize;


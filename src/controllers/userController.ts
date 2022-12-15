import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import generateJWT from '../../helpers/generateJWT'
import userModel from '../models/userModel';
import rolesModel from '../models/rolesModel';

const createAccount = async (req: Request, res: Response, next: NextFunction) => {

  console.log(req.body);
  // Check if the required parameters are present
  if (!req.body.name || !req.body.username || !req.body.password || !req.body.role) {
    return res.status(400).json({
      success: false,
      message: 'Name, username, password, and role are required.'
    });
  }

  // Check if the specified role exists
  const roleModel = await rolesModel.findOne({ where: { name: req.body.role } });
  if (!roleModel) {
    return res.status(400).json({
      success: false,
      message: 'The specified role does not exist.'
    });
  }

  // Check if the specified role is either "user" or "admin"
  if (req.body.role !== 'user' && req.body.role !== 'admin') {
    return res.status(400).json({
      success: false,
      message: 'The specified role is invalid. It must be either "user" or "admin".'
    });
  }

  // Check if a user with the specified username already exists
  const user = await userModel.findOne({ where: { username: req.body.username } });
  if (user) {
    return res.status(409).json({
      success: false,
      message: 'A user with the specified username already exists.'
    });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // Create a new user
  const newUser = await userModel.create({
    name: req.body.name,
    username: req.body.username,
    password: hashedPassword,
    role_id: roleModel.get('id')
  });

  // Generate a JSON Web Token
  const token = generateJWT({ id: newUser.get('id') }, process.env.SECRET, {
    expiresIn: 86400 // expires in 24 hours
  });

  res.status(201).json({
    success: true,
    message: 'Account created successfully.',
    data: {
      id: newUser.get('id'),
      name: newUser.get('name'),
      username: newUser.get('username'),
      role_id: newUser.get('role_id'),
      token: token
    }
  });
};




// // Logs in an existing user
// const login = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Get the user's data from the request body
//     const { username, password } = req.body;

//     // Find the user in the database
//     const user = await User.findOne({ where: { username } });

//     // Check if a user with the given username exists
//     if (!user) {
//       throw new Error('Incorrect username or password');
//     }

//     // Check if the provided password is correct
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       throw new Error('Incorrect username or password');
//     }

//     // Create a JSON web token for the user
//     const token = jwt.sign({ id: user.id }, process.env.SECRET, {
//       expiresIn: 86400 // Expires in 24 hours
//     });

//     // Send the user's data and the generated token as the response
//     res.json({
//       id: user.id,
//       name: user.name,
//       username: user.username,
//       role_id: user.role_id,
//       token
//     });
//   } catch (err) {
//     // Forward the error to the error handling middleware
//     next(err);
//   }
// };

export default { 
    createAccount,
    //  login 
    };

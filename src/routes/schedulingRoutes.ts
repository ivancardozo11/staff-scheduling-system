import express from 'express';
import userController from '../controllers/userController';
import adminController from '../controllers/adminController';
import authenticate from '../auth/authenticate';
import authorize from '../auth/authorize';

const router = express.Router();

// User endpoints
// Creates a new user account
router.post('/account/create', userController.createAccount);
// Logs in an existing user
router.post('/account/login', userController.login); 
// // Staff users can view their schedule
router.get('/schedule/:userId', authenticate, authorize('user'), userController.viewSchedule);
// Staff users can view their coworker schedules
router.get('/coworkers/:userId', authenticate, authorize('user'), userController.viewCoworkerSchedules);

// // Admin endpoints

// // Admins can create a schedule for users
router.post('/schedule/create', authenticate, authorize('admin'), adminController.createSchedule);
// // Admins can update a schedule for users
// router.put('/schedule/update', authenticate, authorize('admin'), adminController.updateSchedule);
// // Admins can delete a schedule for users
// router.delete('/schedule/delete', authenticate, authorize('admin'), adminController.deleteSchedule);
// //Admins can order the list of users by accumulated work hours
// router.get('/users/order', authenticate, authorize('admin'), adminController.orderUsersByWorkHours); 


export default router;

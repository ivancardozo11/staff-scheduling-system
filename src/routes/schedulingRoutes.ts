import express from 'express';
import userController from '../controllers/userController';
import adminController from '../controllers/adminController';
import authenticate from '../auth/authenticate';
import authorize from '../auth/authorize';

const router = express.Router();

router.post('/account/create', userController.createAccount);
router.post('/account/login', userController.login); 
router.get('/schedule/:userId', authenticate, authorize('user'), userController.viewSchedule);
router.get('/coworkers/:userId', authenticate, authorize('user'), userController.viewCoworkerSchedules);

router.post('/schedule/create', authenticate, authorize('admin'), adminController.createSchedule);
router.put('/schedule/update', authenticate, authorize('admin'), adminController.updateSchedule);
router.delete('/schedule/delete', authenticate, authorize('admin'), adminController.deleteSchedule);
router.get('/users/order', authenticate, authorize('admin'), adminController.orderUsersByWorkHours); 


export default router;

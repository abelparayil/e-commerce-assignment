import { Router } from 'express';
import {
  loginUser,
  registerUser,
  resetPassword,
} from '../controllers/user-controller.js';

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/reset-password', resetPassword);
userRouter.post('/logout');

export default userRouter;

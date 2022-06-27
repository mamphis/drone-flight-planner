import { Router } from "express";
import userRouter from './user';
import teamRouter from './team';

const router = Router();

router.use('/users', userRouter);
router.use('/teams', teamRouter);

export default router;
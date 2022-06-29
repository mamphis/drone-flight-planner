import { Router } from "express";
import userRouter from './user';
import teamRouter from './team';
import missionRouter from './mission';

const router = Router();

router.use('/users', userRouter);
router.use('/teams', teamRouter);
router.use('/missions', missionRouter);

export default router;
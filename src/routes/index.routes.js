import { Router } from 'express';
// import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';

const router = Router();
router.use(userRouter);
// router.use(authRouter);

export default router;
import { Router } from 'express'
import { authValidation } from '../middlewares/auth.middleware.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { imageSchema } from '../schemas/auth.schemas.js';
import { createImage } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.use(authValidation);
authRouter.post('/images', schemaValidation(imageSchema), createImage);
authRouter.post('');

export default authRouter;
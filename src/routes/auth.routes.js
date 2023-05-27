import { Router } from 'express'
import { authValidation } from '../middlewares/auth.middleware.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { imageSchema, postSchema } from '../schemas/auth.schemas.js';
import { createImage, createPost, getUser } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.use(authValidation);
authRouter.post('/images', schemaValidation(imageSchema), createImage);
authRouter.post('/posts', schemaValidation(postSchema), createPost);
authRouter.get('/user', getUser);

export default authRouter;
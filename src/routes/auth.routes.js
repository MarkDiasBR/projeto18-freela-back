import { Router } from 'express'
import { authValidation } from '../middlewares/auth.middleware.js';
import { schemaValidation } from '../middlewares/schemaValidation.middleware.js';
import { imageSchema, postSchema } from '../schemas/auth.schemas.js';
import { createImage, createPost, getUser, putPostLike, putFollower, getFollowers, getFollowing, searchUser } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.use(authValidation);
authRouter.post('/images', schemaValidation(imageSchema), createImage);
authRouter.post('/posts', schemaValidation(postSchema), createPost);
authRouter.get('/users/me', getUser);
authRouter.put('/posts/:postId/likes', putPostLike);
authRouter.put('/users/:userId/followers', putFollower);
authRouter.get('/users/followers', getFollowers);
authRouter.get('/users/following', getFollowing);
authRouter.get('/users/search', searchUser)

export default authRouter;
import {Hono} from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';
import { registerController } from '../controllers/userController';

const r = new Hono();

r.post('/user/register', registerController);

r.use('/*',authMiddleware)

export default r;
import {Hono} from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';
import { loginController, registerController } from '../controllers/userController';

const r = new Hono();

r.post('/user/register', registerController);
r.post('/user/login', loginController);

r.use('/*',authMiddleware)

export default r;
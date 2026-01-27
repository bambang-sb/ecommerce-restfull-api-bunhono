import {Hono} from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';

const r = new Hono();

r.use('/*',authMiddleware)

export default r;
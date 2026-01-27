import {Context, Next} from 'hono';
import { verify } from 'hono/jwt';
import { ErrorHandle } from '../errors/errors-handle';

const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new ErrorHandle('Unauthorized',401);
  }

  const token = authHeader.split(' ')[1];
  
  const valid = await verify(token, Bun.env.TOKEN_SECRET || 'default_secret','HS256');
  if (!valid) {
    throw new ErrorHandle('Invalid token',401);
  }

  c.set('jwtPayload', valid);

  await next();
}
export {
  authMiddleware
};
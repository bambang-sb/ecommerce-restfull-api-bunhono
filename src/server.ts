import { Hono } from 'hono'
import r from './routes/route'
import errorMiddleware from './middleware/error-middleware'
import { errorResponse } from './helpers/response';

const app = new Hono()

app.route('/api',r)

app.get('/', async (c) => {

  return c.text('Hello Hono!')
})

app.notFound(async (c) => {
  return errorResponse(c, 'Not Found', 404);
});

app.onError(errorMiddleware)

export default app

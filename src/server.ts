import "dotenv/config"
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import r from './routes/route'
import errorMiddleware from './middleware/error-middleware'
import { errorResponse } from './helpers/response';
import umum from './routes/app'

const app = new Hono()

app.use('*',cors({
  origin: 'http://localhost:3001',
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))
app.route('/api',r)
app.route('/app',umum)
app.get('/', async (c) => {

  return c.text('Hello Hono!')
})

app.notFound(async (c) => {
  return errorResponse(c, 'Not Found', 404);
});

app.onError(errorMiddleware)

export default app

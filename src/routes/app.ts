import {Hono} from 'hono'
import productCustomer from '../controllers/customer/productCustomerController'

const app = new Hono()

app.get('/product',productCustomer.getProduct)

export default app
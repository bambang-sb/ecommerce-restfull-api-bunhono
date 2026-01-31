import {Hono} from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';
import { loginController, registerController } from '../controllers/userController';
import categorieController from '../controllers/categorieController';
import productController from '../controllers/productController';
import addressController from '../controllers/addressController';
import cartController from '../controllers/cartController';
import orderController from '../controllers/orderController';

const r = new Hono();

r.post('/user/register', registerController);
r.post('/user/login', loginController);

r.use('/*',authMiddleware)

r.get('/categorie',categorieController.getAll)
r.get('/categorie/:id',categorieController.getId)
r.post('/categorie',categorieController.create)
r.put('/categorie/:id',categorieController.update)

r.get('/product',productController.getAll)
r.get('/product/:id',productController.getId)
r.post('/product',productController.create)
r.put('/product/:id',productController.update)

r.get('/address',addressController.getUserAddress)
r.post('/address',addressController.createOrUpdateUserAddress)

r.get('/cart',cartController.getCart)
r.post('/cart',cartController.createCartItem)
r.put('/cart-item/:idCartItem/quantity',cartController.updateCartItemQuantity)
r.delete('/cart-item/:idCartItem',cartController.deleteCartItem)

r.get('/order',orderController.getOrder)
r.post('/order',orderController.createOrder)

export default r;
import {Hono} from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';
import { loginController, registerController } from '../controllers/userController';
import categorieController from '../controllers/categorieController';
import productController from '../controllers/productController';

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

export default r;
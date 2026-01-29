import {Hono} from 'hono';
import { authMiddleware } from '../middleware/auth-middleware';
import { loginController, registerController } from '../controllers/userController';
import categorieController from '../controllers/categorieController';

const r = new Hono();

r.post('/user/register', registerController);
r.post('/user/login', loginController);

r.use('/*',authMiddleware)

r.get('/categorie',categorieController.getAll)
r.get('/categorie/:id',categorieController.getId)
r.post('/categorie',categorieController.create)
r.put('/categorie/:id',categorieController.update)

export default r;
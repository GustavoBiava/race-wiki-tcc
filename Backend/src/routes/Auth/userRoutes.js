import { Router } from 'express';

import UserController from '../../controllers/Auth/UserController';
import { loginRequired } from '../../middlewares/Auth/loginRequired';

const route = Router();

route.get('/', UserController.index);
route.post('/', UserController.store);
route.get('/:id', UserController.show);
route.put('/', loginRequired, UserController.update);
route.delete('/', loginRequired, UserController.delete);

export default route;

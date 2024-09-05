import { Router } from 'express';

import UserController from '../../controllers/Auth/UserController';

const route = Router();

route.get('/', UserController.index);
route.post('/', UserController.store);
route.get('/:id', UserController.show);
route.put('/:id', UserController.update);
route.delete('/:id', UserController.delete);

export default route;

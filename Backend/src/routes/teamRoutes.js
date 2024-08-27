import { Router } from 'express';

import teamController from '../controllers/teamController';

const route = Router();

route.get('/', teamController.index);
route.post('/', teamController.store);
route.get('/:id', teamController.show);
route.put('/:id', teamController.update);
route.delete('/:id', teamController.delete);

export default route;

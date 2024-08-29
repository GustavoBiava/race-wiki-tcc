import { Router } from 'express';

import TeamController from '../controllers/TeamController';

const route = Router();

route.get('/', TeamController.index);
route.post('/', TeamController.store);
route.get('/:id', TeamController.show);
route.put('/:id', TeamController.update);
route.delete('/:id', TeamController.delete);

export default route;

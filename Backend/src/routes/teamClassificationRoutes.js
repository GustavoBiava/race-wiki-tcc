import { Router } from 'express';

import TeamClassificationController from '../controllers/TeamClassificationController';

const route = Router();

route.get('/', TeamClassificationController.index);
route.post('/', TeamClassificationController.store);
route.get('/:id', TeamClassificationController.show);
route.put('/:id', TeamClassificationController.update);
route.delete('/:id', TeamClassificationController.delete);

export default route;

import { Router } from 'express';

import SeasonController from '../controllers/SeasonController';

const route = Router();

route.get('/', SeasonController.index);
route.post('/', SeasonController.store);
route.get('/:id', SeasonController.show);
route.put('/:id', SeasonController.update);
route.delete('/:id', SeasonController.delete);

export default route;

import { Router } from 'express';

import RaceController from '../controllers/RaceController';

const route = Router();

route.get('/', RaceController.index);
route.post('/', RaceController.store);
route.get('/:id', RaceController.show);
route.put('/:id', RaceController.update);
route.delete('/:id', RaceController.delete);

export default route;

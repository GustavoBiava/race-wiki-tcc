import { Router } from 'express';

import DriverRaceResultController from '../controllers/DriverRaceResultController';

const route = Router();

route.get('/', DriverRaceResultController.index);
route.post('/', DriverRaceResultController.store);
route.get('/:id', DriverRaceResultController.show);
route.put('/:id', DriverRaceResultController.update);
route.delete('/:id', DriverRaceResultController.delete);

export default route;

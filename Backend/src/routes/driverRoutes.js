import { Router } from 'express';

import DriverController from '../controllers/DriverController';

const route = Router();

route.get('/', DriverController.index);
route.post('/', DriverController.store);
route.get('/:id', DriverController.show);
route.put('/:id', DriverController.update);
route.delete('/:id', DriverController.delete);

export default route;

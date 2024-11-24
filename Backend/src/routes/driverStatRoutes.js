import { Router } from 'express';

import DriverStatController from '../controllers/DriverStatController';

const route = Router();

route.get('/', DriverStatController.index);
route.post('/', DriverStatController.store);
route.get('/:id', DriverStatController.show);
route.get('/driver/:id', DriverStatController.showByDriver);
route.put('/:id', DriverStatController.update);
route.delete('/:id', DriverStatController.delete);

export default route;

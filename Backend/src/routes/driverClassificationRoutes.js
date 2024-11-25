import { Router } from 'express';

import DriverClassificationController from '../controllers/DriverClassificationController';

const route = Router();

route.get('/', DriverClassificationController.index);
route.post('/', DriverClassificationController.store);
route.get('/:id', DriverClassificationController.show);
route.get('/driver/:id', DriverClassificationController.showByDriver);
route.put('/:id', DriverClassificationController.update);
route.delete('/:id', DriverClassificationController.delete);

export default route;

import { Router } from 'express';

import DriverQualifyingResultController from '../controllers/DriverQualifyingResultController';

const route = Router();

route.get('/', DriverQualifyingResultController.index);
route.post('/', DriverQualifyingResultController.store);
route.get('/:id', DriverQualifyingResultController.show);
route.put('/:id', DriverQualifyingResultController.update);
route.delete('/:id', DriverQualifyingResultController.delete);

export default route;

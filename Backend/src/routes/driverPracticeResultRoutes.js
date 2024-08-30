import { Router } from 'express';

import DriverPracticeResultController from '../controllers/DriverPracticeResultController';

const route = Router();

route.get('/', DriverPracticeResultController.index);
route.post('/', DriverPracticeResultController.store);
route.get('/:id', DriverPracticeResultController.show);
route.put('/:id', DriverPracticeResultController.update);
route.delete('/:id', DriverPracticeResultController.delete);

export default route;

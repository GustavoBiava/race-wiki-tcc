import { Router } from 'express';

import PracticeController from '../controllers/PracticeController';

const route = Router();

route.get('/', PracticeController.index);
route.post('/', PracticeController.store);
route.get('/:id', PracticeController.show);
route.put('/:id', PracticeController.update);
route.delete('/:id', PracticeController.delete);

export default route;

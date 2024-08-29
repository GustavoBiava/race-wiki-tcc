import { Router } from 'express';

import QualifyingController from '../controllers/QualifyingController';

const route = Router();

route.get('/', QualifyingController.index);
route.post('/', QualifyingController.store);
route.get('/:id', QualifyingController.show);
route.put('/:id', QualifyingController.update);
route.delete('/:id', QualifyingController.delete);

export default route;

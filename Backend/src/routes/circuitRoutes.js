import { Router } from 'express';

import CircuitController from '../controllers/CircuitController';

const route = Router();

route.get('/', CircuitController.index);
route.post('/', CircuitController.store);
route.get('/:id', CircuitController.show);
route.put('/:id', CircuitController.update);
route.delete('/:id', CircuitController.delete);

export default route;

import { Router } from 'express';

import CareerContractsController from '../controllers/CareerContractsController';

const route = Router();

route.get('/', CareerContractsController.index);
route.post('/', CareerContractsController.store);
route.get('/:id', CareerContractsController.show);
route.put('/:id', CareerContractsController.update);
route.delete('/:id', CareerContractsController.delete);

export default route;

import { Router } from "express";

import CountryController from '../controllers/CountryController';

const route = Router();

route.get('/', CountryController.index);
route.post('/', CountryController.store);
route.get('/:id', CountryController.show);
route.put('/:id', CountryController.update);
route.delete('/:id', CountryController.delete);

export default route;

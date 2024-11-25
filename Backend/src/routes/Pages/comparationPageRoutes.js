import { Router } from 'express';

import ComparationPageController from '../../controllers/Pages/ComparationPageController';

const route = Router();

route.get('/drivers', ComparationPageController.getDrivers);

export default route;

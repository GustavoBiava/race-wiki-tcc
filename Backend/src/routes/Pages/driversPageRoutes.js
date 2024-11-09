import { Router } from 'express';

import DriversPageController from '../../controllers/Pages/DriversPageController';

const route = Router();

route.get('/', DriversPageController.getDrivers);

export default route;

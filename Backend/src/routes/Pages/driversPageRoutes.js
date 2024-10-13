import { Router } from 'express';

import DriverPageController from '../../controllers/Pages/DriverPageController';

const route = Router();

route.get('/', DriverPageController.getDrivers);

export default route;

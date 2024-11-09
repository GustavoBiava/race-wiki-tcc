import { Router } from 'express';

import DriverPageController from '../../controllers/Pages/DriverPageController';

const route = Router();

route.get('/:short_name', DriverPageController.getDriver);

export default route;

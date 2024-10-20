import { Router } from 'express';

import FavoriteDriverController from '../../controllers/Pages/FavortiteDriverController';

const route = Router();

route.get('/:id', FavoriteDriverController.getDrivers);

export default route;

import { Router } from 'express';

import RacePageController from '../../controllers/Pages/RacePageController';

const route = Router();

route.get('/:slug', RacePageController.getRace);

export default route;

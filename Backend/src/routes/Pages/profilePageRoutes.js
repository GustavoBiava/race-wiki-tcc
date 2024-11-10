import { Router } from 'express';

import ProfilePageController from '../../controllers/Pages/ProfilePageController';

const route = Router();

route.get('/:id', ProfilePageController.getUserProfile);

export default route;

import { Router } from 'express';

import NavbarController from '../../controllers/Pages/NavbarController';

const route = Router();

route.get('/:id', NavbarController.getUserProfile);

export default route;

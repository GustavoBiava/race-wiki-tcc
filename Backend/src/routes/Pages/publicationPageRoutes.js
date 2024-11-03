import { Router } from 'express';

import PublicationPageController from '../../controllers/Pages/PublicationPageController';

const route = Router();

route.get('/:slug', PublicationPageController.getPublication);

export default route;

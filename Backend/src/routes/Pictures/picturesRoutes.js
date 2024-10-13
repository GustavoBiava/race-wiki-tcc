import { Router } from 'express';

import PicturesController from '../../controllers/Pictures/PicturesController';

const route = Router();

route.post('/drivers', PicturesController.storeDriver);

export default route;

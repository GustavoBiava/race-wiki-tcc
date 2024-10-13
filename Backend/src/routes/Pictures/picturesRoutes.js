import { Router } from 'express';

import PicturesController from '../../controllers/Pictures/PicturesController';

const route = Router();

route.post('/drivers', PicturesController.storeDriver);
route.post('/countries', PicturesController.storeCountry);

export default route;

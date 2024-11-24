import { Router } from 'express';

import PicturesController from '../../controllers/Pictures/PicturesController';

const route = Router();

route.post('/drivers', PicturesController.storeDriver);
route.put('/drivers', PicturesController.updateDriver);

route.post('/countries', PicturesController.storeCountry);
route.put('/countries', PicturesController.updateCountry);

route.post('/teams', PicturesController.storeTeam);
route.post('/races', PicturesController.storeRace);
route.post('/publications', PicturesController.storePublication);

export default route;

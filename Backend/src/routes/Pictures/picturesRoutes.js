import { Router } from 'express';

import PicturesController from '../../controllers/Pictures/PicturesController';

const route = Router();

route.post('/drivers', PicturesController.storeDriver);
route.post('/countries', PicturesController.storeCountry);
route.post('/teams', PicturesController.storeTeam);
route.post('/races', PicturesController.storeRace);

export default route;

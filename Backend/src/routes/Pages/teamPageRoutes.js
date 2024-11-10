import { Router } from 'express';

import TeamPageController from '../../controllers/Pages/TeamPageController';

const route = Router();

route.get('/:short_name', TeamPageController.getTeam);
route.get('/:short_name/:year', TeamPageController.getTeamResults);

export default route;

import { Router } from 'express';

import FavoriteTeamController from '../../controllers/Pages/FavortiteTeamController';

const route = Router();

route.get('/', FavoriteTeamController.getTeams);

export default route;

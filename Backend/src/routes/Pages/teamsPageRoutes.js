import { Router } from "express";

import TeamPageController from '../../controllers/Pages/TeamPageController';

const route = Router();

route.get('/', TeamPageController.getTeams);

export default route;

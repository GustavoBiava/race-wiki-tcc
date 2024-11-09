import { Router } from "express";

import TeamsPageController from '../../controllers/Pages/TeamsPageController';

const route = Router();

route.get('/', TeamsPageController.getTeams);

export default route;

import { Router } from "express";

import HomePageController from '../../controllers/Pages/HomePageController';

const route = Router();

route.get('/races', HomePageController.getRaces);
route.get('/publications', HomePageController.getPublications);
route.get('/driverClassificationLeaders/:year', HomePageController.getDriverClassificationLeaders);
route.get('/driverClassification/:year', HomePageController.getDriverClassification);
route.get('/teamClassificationLeaders/:year', HomePageController.getTeamClassificationLeaders);
route.get('/teamClassification/:year', HomePageController.getTeamClassification);

export default route;

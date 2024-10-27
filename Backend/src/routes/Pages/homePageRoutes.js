import { Router } from "express";

import HomePageController from '../../controllers/Pages/HomePageController';

const route = Router();

route.get('/races', HomePageController.getRaces);
route.get('/publications', HomePageController.getPublications);
route.get('/driverClassification', HomePageController.getDriverClassification);

export default route;

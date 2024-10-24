import { Router } from "express";

import HomePageController from '../../controllers/Pages/HomePageController';

const route = Router();

route.get('/races', HomePageController.getRaces);

export default route;

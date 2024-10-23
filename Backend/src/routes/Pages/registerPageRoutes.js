import { Router } from 'express';

import RegisterPageController from '../../controllers/Pages/RegisterPageController';

const route = Router();

route.get('/validateEmail', RegisterPageController.emailValidation);
route.get('/validateNickname', RegisterPageController.nicknameValidation);

export default route;

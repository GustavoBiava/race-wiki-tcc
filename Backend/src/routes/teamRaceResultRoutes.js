import { Router } from 'express';

import TeamRaceResultController from '../controllers/TeamRaceResultController';

const route = Router();

route.get('/', TeamRaceResultController.index);
route.post('/', TeamRaceResultController.store);
route.get('/:id', TeamRaceResultController.show);
route.get('/:id/:team_id', TeamRaceResultController.showByRaceAndTeam);
route.put('/:id', TeamRaceResultController.update);
route.delete('/:id', TeamRaceResultController.delete);

export default route;

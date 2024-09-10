import { Router } from 'express';

import PublicationController from '../../controllers/Social/PublicationController';

const route = Router();

route.get('/', PublicationController.index);
route.post('/', PublicationController.store);
route.get('/:id', PublicationController.show);
route.put('/:id', PublicationController.update);
route.delete('/:id', PublicationController.delete);

export default route;

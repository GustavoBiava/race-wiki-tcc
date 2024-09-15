import { Router } from 'express';

import TagController from '../../controllers/Social/TagController';

const route = Router();

route.get('/', TagController.index);
route.post('/', TagController.store);
route.get('/:id', TagController.show);
route.put('/:id', TagController.update);
route.delete('/:id', TagController.delete);

export default route;

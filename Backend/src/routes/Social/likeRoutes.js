import { Router } from 'express';

import LikeController from '../../controllers/Social/LikeController';

const route = Router();

route.get('/', LikeController.index);
route.post('/', LikeController.store);
route.get('/:id', LikeController.show);
route.put('/:id', LikeController.update);
route.delete('/:id', LikeController.delete);

export default route;

import { Router } from 'express';

import CommentController from '../../controllers/Social/CommentController';

const route = Router();

route.get('/', CommentController.index);
route.post('/', CommentController.store);
route.get('/:id', CommentController.show);
route.put('/:id', CommentController.update);
route.delete('/:id', CommentController.delete);

export default route;

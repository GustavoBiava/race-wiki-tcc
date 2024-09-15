import { Router } from 'express';

import CommentsCommentController from '../../controllers/Social/CommentsCommentController';

const route = Router();

route.get('/', CommentsCommentController.index);
route.post('/', CommentsCommentController.store);
route.get('/:id', CommentsCommentController.show);
route.put('/:id', CommentsCommentController.update);
route.delete('/:id', CommentsCommentController.delete);

export default route;

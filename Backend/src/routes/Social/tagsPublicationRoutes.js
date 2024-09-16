import { Router } from 'express';

import TagsPublicationController from '../../controllers/Social/TagsPublicationController';

const route = Router();

route.get('/', TagsPublicationController.index);
route.post('/', TagsPublicationController.store);
route.get('/:id', TagsPublicationController.show);
route.put('/:id', TagsPublicationController.update);
route.delete('/:id', TagsPublicationController.delete);

export default route;

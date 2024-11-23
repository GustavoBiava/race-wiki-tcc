import TagsPublication from '../../models/Social/TagsPublication';
import Tag from '../../models/Social/Tag';
import Publication from '../../models/Social/Publication';

class TagsPublicationController {
  async index(req, res) {
    try {
      const tagsPublications = await TagsPublication.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (tagsPublications.length < 0) {
        return res.status(204).json({ message: ['There is no TagsPublications registered!'] });
      }

      return res.status(200).json(tagsPublications);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const tagsPublication = await TagsPublication.create(req.body);
      return res.status(201).json(tagsPublication);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error! Try check the Foreign Key.'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const tagsPublication = await TagsPublication.findByPk(id, {
        include: [Tag, Publication ],
        attributes: { exclude: ['tag_id', 'publication_id'] }
      });

      if (!tagsPublication) return res.status(404).json({ errors: ['TagsPublication doesn\'t exists!'] });

      return res.status(200).json(tagsPublication);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async showByTag(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const tagsPublication = await TagsPublication.findOne({
        where: { tag_id: id },
        include: [Tag, Publication ],
        attributes: { exclude: ['tag_id', 'publication_id'] }
      });

      if (!tagsPublication) return res.status(404).json({ errors: ['TagsPublication doesn\'t exists!'] });

      return res.status(200).json(tagsPublication);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const tagsPublication = await TagsPublication.findByPk(id);
      if (!tagsPublication) return res.status(404).json({ errors: ['TagsPublication doesn\'t exists!'] });

      const updatedTagsPublication = await tagsPublication.update(req.body);

      return res.status(200).json(updatedTagsPublication);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error! Try check the Foreign Key.'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const tagsPublication = await TagsPublication.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!tagsPublication) return res.status(404).json({ errors: ['TagsPublication doesn\'t exists!'] });

      await tagsPublication.destroy();

      return res.status(200).json({deletedTagsPublication: tagsPublication});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new TagsPublicationController();

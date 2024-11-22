import Tag from '../../models/Social/Tag';

class TagController {

  async index(req, res) {
    try {
      const tags = await Tag.findAll({
        order: [ ['id', 'ASC'] ],
      });

      if (tags.length < 0) {
        return res.status(204).json({ message: ['There is no Tags registered!'] });
      }

      return res.status(200).json(tags);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const tag = await Tag.create(req.body);
      return res.status(201).json(tag);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const tag = await Tag.findByPk(id, {
        attributes: { exclude: ['user_id', 'publication_id'] }
      });

      if (!tag) return res.status(204).json({ errors: ['Tag doesn\'t exists!'] });

      return res.status(200).json(tag);
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

      const tag = await Tag.findByPk(id);
      if (!tag) return res.status(404).json({ errors: ['Tag doesn\'t exists!'] });

      const updatedTag = await tag.update(req.body);

      return res.status(200).json(updatedTag);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const tag = await Tag.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!tag) return res.status(404).json({ errors: ['Tag doesn\'t exists!'] });

      await tag.destroy();

      return res.status(200).json({deletedTag: tag});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new TagController();

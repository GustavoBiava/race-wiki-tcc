import Like from '../../models/Social/Like';
import User from '../../models/Auth/User';
import Publication from '../../models/Social/Publication';

class LikeController {

  async index(req, res) {
    try {
      const likes = await Like.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (likes.length < 0) {
        return res.status(204).json({ message: ['There is no Likes registered!'] });
      }

      return res.status(200).json(likes);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const like = await Like.create(req.body);
      return res.status(201).json(like);
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

      const like = await Like.findByPk(id, {
        include: [User, Publication ],
        attributes: { exclude: ['user_id', 'publication_id'] }
      });

      if (!like) return res.status(404).json({ errors: ['Like doesn\'t exists!'] });

      return res.status(200).json(like);
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

      const like = await Like.findByPk(id);
      if (!like) return res.status(404).json({ errors: ['Like doesn\'t exists!'] });

      const updatedLike = await like.update(req.body);

      return res.status(200).json(updatedLike);
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

      const like = await Like.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!like) return res.status(404).json({ errors: ['Like doesn\'t exists!'] });

      await like.destroy();

      return res.status(200).json({deletedLike: like});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new LikeController();

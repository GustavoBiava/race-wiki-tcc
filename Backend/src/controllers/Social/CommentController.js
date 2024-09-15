import Comment from '../../models/Social/Comment';
import User from '../../models/Auth/User';
import Publication from '../../models/Social/Publication';

class CommentController {

  async index(req, res) {
    try {
      const comments = await Comment.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (comments.length < 0) {
        return res.status(204).json({ message: ['There is no Comments registered!'] });
      }

      return res.status(200).json(comments);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const comment = await Comment.create(req.body);
      return res.status(201).json(comment);
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

      const comment = await Comment.findByPk(id, {
        include: [User, Publication ],
        attributes: { exclude: ['user_id', 'publication_id'] }
      });

      if (!comment) return res.status(404).json({ errors: ['Comment doesn\'t exists!'] });

      return res.status(200).json(comment);
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

      const comment = await Comment.findByPk(id);
      if (!comment) return res.status(404).json({ errors: ['Comment doesn\'t exists!'] });

      const updatedComment = await comment.update(req.body);

      return res.status(200).json(updatedComment);
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

      const comment = await Comment.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!comment) return res.status(404).json({ errors: ['Comment doesn\'t exists!'] });

      await comment.destroy();

      return res.status(200).json({deletedComment: comment});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new CommentController();

import CommentsComment from '../../models/Social/CommentsComment';
import User from '../../models/Auth/User';
import Comment from '../../models/Social/Comment';

class CommentController {

  async index(req, res) {
    try {
      const commentsComments = await CommentsComment.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (commentsComments.length < 0) {
        return res.status(204).json({ message: ['There is no Comment\'s Comments registered!'] });
      }

      return res.status(200).json(commentsComments);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const commentsComment = await CommentsComment.create(req.body);
      return res.status(201).json(commentsComment);
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

      const commentsComment = await CommentsComment.findByPk(id, {
        include: [User, Comment ],
        attributes: { exclude: ['user_id', 'comment_id'] }
      });

      if (!commentsComment) return res.status(404).json({ errors: ['Comment\'s Comment doesn\'t exists!'] });

      return res.status(200).json(commentsComment);
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

      const commentsComment = await CommentsComment.findByPk(id);
      if (!commentsComment) return res.status(404).json({ errors: ['Comment doesn\'t exists!'] });

      const updatedCommentsComment = await commentsComment.update(req.body);

      return res.status(200).json(updatedCommentsComment);
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

      const commentsComment = await CommentsComment.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!commentsComment) return res.status(404).json({ errors: ['Comment\'s Comment doesn\'t exists!'] });

      await commentsComment.destroy();

      return res.status(200).json({deletedCommentsComment: commentsComment});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new CommentController();

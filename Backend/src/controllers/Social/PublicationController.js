import User from "../../models/Auth/User";
import Publication from "../../models/Social/Publication";

class PublicationController {

  async index(req, res) {
    try {
      const publications = await Publication.findAll({
        order: [ ['id', 'ASC'] ],
        include: [
          {
            model: User,
            as: 'publication_author',
            attributes: ['nickname']
          }
        ]
      });

      if (publications.length < 0) {
        return res.status(204).json({ message: ['There is no Publications registered!'] });
      }

      return res.status(200).json(publications);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const publication = await Publication.create(req.body);
      return res.status(201).json(publication);
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

      const publication = await Publication.findByPk(id, {
        include: [User ],
        attributes: { exclude: ['author'] }
      });

      if (!publication) return res.status(404).json({ errors: ['Publication doesn\'t exists!'] });

      return res.status(200).json(publication);
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

      const publication = await Publication.findByPk(id);
      if (!publication) return res.status(404).json({ errors: ['Publication doesn\'t exists!'] });

      const updatedContract = await publication.update(req.body);

      return res.status(200).json(updatedContract);
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

      const publication = await Publication.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!publication) return res.status(404).json({ errors: ['Publication doesn\'t exists!'] });

      await publication.destroy();

      return res.status(200).json({deletedPublication: publication});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new PublicationController();

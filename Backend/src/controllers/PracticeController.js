import Practice from "../models/Practice";
import Race from "../models/Race";

class PracticeController {

  async index(req, res) {
    try {
      const practices = await Practice.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (practices.length < 0) {
        return res.status(204).json({ message: ['There is no Practices registered!'] });
      }

      return res.status(200).json(practices);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const practice = await Practice.create(req.body);
      return res.status(201).json(practice);
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

      const practice = await Practice.findByPk(id, {
        include: [
          { model: Race, as: 'race' },
        ],
        attributes: { exclude: ['race_id'] }
      });

      if (!practice) return res.status(404).json({ errors: ['Practice doesn\'t exists!'] });

      return res.status(200).json(practice);
    }
    catch (err) {
      console.log(err)
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const practice = await Practice.findByPk(id);
      if (!practice) return res.status(404).json({ errors: ['Practice doesn\'t exists!'] });

      const updatedPractice = await practice.update(req.body);

      return res.status(200).json(updatedPractice);
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

      const practice = await Practice.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!practice) return res.status(404).json({ errors: ['Practice doesn\'t exists!'] });

      await practice.destroy();

      return res.status(200).json({deletedPractice: practice});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new PracticeController();

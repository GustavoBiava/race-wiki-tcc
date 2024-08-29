import Qualifying from '../models/Qualifying';
import Race from '../models/Race';

class QualifyingController {

  async index(req, res) {
    try {
      const qualifiers = await Qualifying.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (qualifiers.length < 0) {
        return res.status(204).json({ message: ['There is no Qualifiers registered!'] });
      }

      return res.status(200).json(qualifiers);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const qualifying = await Qualifying.create(req.body);
      return res.status(201).json(qualifying);
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

      const qualifying = await Qualifying.findByPk(id, {
        include: [
          { model: Race, as: 'race' },
        ],
        attributes: { exclude: ['race_id'] }
      });

      if (!qualifying) return res.status(404).json({ errors: ['Qualifying doesn\'t exists!'] });

      return res.status(200).json(qualifying);
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

      const qualifying = await Qualifying.findByPk(id);
      if (!qualifying) return res.status(404).json({ errors: ['Qualifying doesn\'t exists!'] });

      const updatedQualifying = await qualifying.update(req.body);

      return res.status(200).json(updatedQualifying);
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

      const qualifying = await Qualifying.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!qualifying) return res.status(404).json({ errors: ['Qualifying doesn\'t exists!'] });

      await qualifying.destroy();

      return res.status(200).json({deletedQualifying: qualifying});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new QualifyingController();

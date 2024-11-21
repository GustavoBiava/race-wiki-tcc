import Season from '../models/Season';
import Driver from '../models/Driver';
import Team from '../models/Team';

class SeasonController {

  async index(req, res) {
    try {
      const seasons = await Season.findAll({
        order: [ ['id', 'ASC'] ],
      });

      if (seasons.length < 0) {
        return res.status(204).json({ message: ['There is no Seasons registered!'] });
      }

      return res.status(200).json(seasons);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const season = await Season.create(req.body);
      return res.status(201).json(season);
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

      const season = await Season.findByPk(id, {
        include: [
          { model: Driver, as: 'winner_driver' },
          { model: Team, as: 'winner_constructor' }
        ],
        attributes: { exclude: ['team_id', 'driver_id'] }
      });

      if (!season) return res.status(404).json({ errors: ['Season doesn\'t exists!'] });

      return res.status(200).json(season);
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

      const season = await Season.findByPk(id);
      if (!season) return res.status(404).json({ errors: ['Season doesn\'t exists!'] });

      const updatedSeason = await season.update(req.body);

      return res.status(200).json(updatedSeason);
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

      const season = await Season.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!season) return res.status(404).json({ errors: ['Season doesn\'t exists!'] });

      await season.destroy();

      return res.status(200).json({deletedSeason: season});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new SeasonController();

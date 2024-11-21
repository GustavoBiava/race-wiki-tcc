import Race from '../models/Race';
import Circuit from '../models/Circuit';
import Season from '../models/Season';
import Driver from '../models/Driver';
import Country from '../models/Country';

class RaceController {

  async index(req, res) {
    try {
      const races = await Race.findAll({
        order: [ ['id', 'ASC'] ],
        include: [
          {
            model: Circuit,
            as: 'circuit',
            attributes: ['name']
          },
          {
            model: Season,
            as: 'season',
            attributes: ['year']
          },
          {
            model: Country,
            as: 'place',
            attributes: ['name'],
          }
        ]
      });

      if (races.length < 0) {
        return res.status(204).json({ message: ['There is no Races registered!'] });
      }

      return res.status(200).json(races);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const race = await Race.create(req.body);
      return res.status(201).json(race);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error! Try check the Foreign Keys or the type ENUM field value (NORMAL or SPRINT) .'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const race = await Race.findByPk(id, {
        include: [
          { model: Circuit, as: 'circuit' },
          { model: Season, as: 'season' },
          { model: Driver, as: 'position_pole' },
          { model: Driver, as: 'winner_driver' },
        ],
        attributes: { exclude: ['circuit_id', 'season_id', 'pole_position', 'race_winner' ] }
      });

      if (!race) return res.status(404).json({ errors: ['Race doesn\'t exists!'] });

      return res.status(200).json(race);
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

      const race = await Race.findByPk(id);
      if (!race) return res.status(404).json({ errors: ['Race doesn\'t exists!'] });

      const updatedRace = await race.update(req.body);

      return res.status(200).json(updatedRace);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error! Try check the Foreign Keys or the type ENUM field value (NORMAL or SPRINT).'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const race = await Race.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!race) return res.status(404).json({ errors: ['Race doesn\'t exists!'] });

      await race.destroy();

      return res.status(200).json({deletedRace: race});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new RaceController();

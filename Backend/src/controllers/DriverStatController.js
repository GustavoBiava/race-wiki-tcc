import DriverStat from "../models/DriverStat";

class DriverStatController {

  async index(req, res) {
    try {
      const driverStats = await DriverStat.findAll({
        attributes: [
          'id',
          'number',
          'races_entered',
          'drivers_championships',
          'victories',
          'podiums',
          'career_points',
          'highest_grid_position',
          'highest_race_finish',
          'times_highest_finish'
        ],
        order: [ ['created_at', 'DESC'] ],
      });

      if (driverStats.length < 0) {
        return res.status(204).json({ message: ['There is no Drivers Stats registered!'] });
      }

      return res.status(200).json(driverStats);
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const driverStat = await DriverStat.create(req.body);
      return res.status(201).json(driverStat);
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const driverStat = await DriverStat.findByPk(id);
      if (!driverStat) return res.status(404).json({ errors: ['Driver Stat doesn\'t exists!'] });

      return res.status(200).json(driverStat);
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const driverStat = await DriverStat.findByPk(id);
      if (!driverStat) return res.status(404).json({ errors: ['Driver Stat doesn\'t exists!'] });

      const updatedDriverStat = await driverStat.update(req.body);

      return res.status(200).json({updatedDriverStat});
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const driverStat = await DriverStat.findByPk(id, {
        attributes: [
          'id',
          'number',
          'races_entered',
          'drivers_championships',
          'victories',
          'podiums',
          'career_points',
          'highest_grid_position',
          'highest_race_finish',
          'times_highest_finish'
        ],
      });
      if (!driverStat) return res.status(404).json({ errors: ['Driver Stat doesn\'t exists!'] });

      await driverStat.destroy();

      return res.status(200).json({deletedDriverStat: driverStat});
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }
}

export default new DriverStatController();

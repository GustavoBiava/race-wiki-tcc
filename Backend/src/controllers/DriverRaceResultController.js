import Driver from "../models/Driver";
import DriverRaceResult from "../models/DriverRaceResult";
import Race from "../models/Race";

class DriverRaceResultController {

  async index(req, res) {
    try {
      const driverRaceResults = await DriverRaceResult.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (driverRaceResults.length < 0) {
        return res.status(204).json({ message: ['There is no DriverRaceResults registered!'] });
      }

      return res.status(200).json(driverRaceResults);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const driverRaceResult = await DriverRaceResult.create(req.body);
      return res.status(201).json(driverRaceResult);
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

      const driverRaceResult = await DriverRaceResult.findByPk(id, {
        include: [
          { model: Driver},
          { model: Race},
        ],
        attributes: { exclude: ['race_id', 'driver_id'] }
      });

      if (!driverRaceResult) return res.status(404).json({ errors: ['DriverRaceResult doesn\'t exists!'] });

      return res.status(200).json(driverRaceResult);
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

      const driverRaceResult = await DriverRaceResult.findByPk(id);
      if (!driverRaceResult) return res.status(404).json({ errors: ['DriverRaceResult doesn\'t exists!'] });

      const updatedDriverRaceResult = await driverRaceResult.update(req.body);

      return res.status(200).json(updatedDriverRaceResult);
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

      const driverRaceResult = await DriverRaceResult.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!driverRaceResult) return res.status(404).json({ errors: ['DriverRaceResult doesn\'t exists!'] });

      await driverRaceResult.destroy();

      return res.status(200).json({deletedDriverRaceResult: driverRaceResult});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new DriverRaceResultController();

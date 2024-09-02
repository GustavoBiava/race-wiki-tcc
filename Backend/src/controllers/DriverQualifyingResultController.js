import DriverQualifyingResult from "../models/DriverQualifyingResult";
import Driver from "../models/Driver";
import Qualifying from "../models/Qualifying";

class DriverQualifyingResultController {

  async index(req, res) {
    try {
      const driverQualifyingResults = await DriverQualifyingResult.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (driverQualifyingResults.length < 0) {
        return res.status(204).json({ message: ['There is no DriverQualifyingResults registered!'] });
      }

      return res.status(200).json(driverQualifyingResults);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const driverQualifyingResult = await DriverQualifyingResult.create(req.body);
      return res.status(201).json(driverQualifyingResult);
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

      const driverQualifyingResult = await DriverQualifyingResult.findByPk(id, {
        include: [
          { model: Driver},
          { model: Qualifying},
        ],
        attributes: { exclude: ['qualifying_id', 'driver_id'] }
      });

      if (!driverQualifyingResult) return res.status(404).json({ errors: ['DriverQualifyingResult doesn\'t exists!'] });

      return res.status(200).json(driverQualifyingResult);
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

      const driverQualifyingResult = await DriverQualifyingResult.findByPk(id);
      if (!driverQualifyingResult) return res.status(404).json({ errors: ['DriverQualifyingResult doesn\'t exists!'] });

      const updatedDriverQualifyingResult = await driverQualifyingResult.update(req.body);

      return res.status(200).json(updatedDriverQualifyingResult);
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

      const driverQualifyingResult = await DriverQualifyingResult.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!driverQualifyingResult) return res.status(404).json({ errors: ['DriverQualifyingResult doesn\'t exists!'] });

      await driverQualifyingResult.destroy();

      return res.status(200).json({deletedDriverQualifyingResult: driverQualifyingResult});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new DriverQualifyingResultController();

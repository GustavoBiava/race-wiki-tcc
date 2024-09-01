import Driver from '../models/Driver';
import DriverPracticeResult from '../models/DriverPracticeResult';
import Practice from '../models/Practice';

class DriverPracticeResultController {

  async index(req, res) {
    try {
      const driverPracticeResults = await DriverPracticeResult.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (driverPracticeResults.length < 0) {
        return res.status(204).json({ message: ['There is no DriverPracticesResults registered!'] });
      }

      return res.status(200).json(driverPracticeResults);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const driverPracticeResult = await DriverPracticeResult.create(req.body);
      return res.status(201).json(driverPracticeResult);
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

      const driverPracticeResult = await DriverPracticeResult.findByPk(id, {
        include: [
          { model: Driver, as: 'driver_practice' },
          { model: Practice, as: 'practice' },
        ],
        attributes: { exclude: ['practice_id', 'driver_id'] }
      });

      if (!driverPracticeResult) return res.status(404).json({ errors: ['DriverPracticeResult doesn\'t exists!'] });

      return res.status(200).json(driverPracticeResult);
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

      const driverPracticeResult = await DriverPracticeResult.findByPk(id);
      if (!driverPracticeResult) return res.status(404).json({ errors: ['DriverPracticeResult doesn\'t exists!'] });

      const updatedDriverPracticeResult = await driverPracticeResult.update(req.body);

      return res.status(200).json(updatedDriverPracticeResult);
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

      const driverPracticeResult = await DriverPracticeResult.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!driverPracticeResult) return res.status(404).json({ errors: ['DriverPracticeResult doesn\'t exists!'] });

      await driverPracticeResult.destroy();

      return res.status(200).json({deletedDriverPracticeResult: driverPracticeResult});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new DriverPracticeResultController();

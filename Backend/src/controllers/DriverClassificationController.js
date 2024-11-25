import { where } from 'sequelize';
import Driver from '../models/Driver';
import DriverClassification from '../models/DriverClassification';
import Season from '../models/Season';

class DriverClassificationController {

  async index(req, res) {
    try {
      const driverClassifications = await DriverClassification.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (driverClassifications.length < 0) {
        return res.status(204).json({ message: ['There is no DriverClassifications registered!'] });
      }

      return res.status(200).json(driverClassifications);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const driverClassification = await DriverClassification.create(req.body);
      return res.status(201).json(driverClassification);
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

      const driverClassification = await DriverClassification.findByPk(id, {
        include: [
          { model: Driver},
          { model: Season},
        ],
        attributes: { exclude: ['season_id', 'driver_id'] }
      });

      if (!driverClassification) return res.status(404).json({ errors: ['DriverClassification doesn\'t exists!'] });

      return res.status(200).json(driverClassification);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async showByDriver(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const driverClassification = await DriverClassification.findOne({
        where: { driver_id: id },
        include: [
          { model: Driver},
          { model: Season},
        ],
      });

      if (!driverClassification) return res.status(204).json({ errors: ['DriverClassification doesn\'t exists!'] });

      return res.status(200).json(driverClassification);
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

      const driverClassification = await DriverClassification.findByPk(id);
      if (!driverClassification) return res.status(404).json({ errors: ['DriverClassification doesn\'t exists!'] });

      const updatedDriverClassification = await driverClassification.update(req.body);

      return res.status(200).json(updatedDriverClassification);
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

      const driverClassification = await DriverClassification.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!driverClassification) return res.status(404).json({ errors: ['DriverClassification doesn\'t exists!'] });

      await driverClassification.destroy();

      return res.status(200).json({deletedDriverClassification: driverClassification});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new DriverClassificationController();

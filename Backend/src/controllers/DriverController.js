import Driver from "../models/Driver";
import Team from "../models/Team";
import DriverStat from "../models/DriverStat";
import Country from "../models/Country";
import DriverPicture from "../models/Pictures/DriverPicture";
import CareerContracts from "../models/CareerContracts";

class DriverController {

  async index(req, res) {
    try {
      const drivers = await Driver.findAll({
        order: [ ['id', 'ASC'] ],
        include: [
          {
            model: Country,
            as: 'country',
            attributes: ['name']
          }
        ]
      });

      if (drivers.length < 0) {
        return res.status(204).json({ message: ['There is no Drivers registered!'] });
      }

      await Promise.all(drivers.map(async (driver) => {
        const driverContracts = await CareerContracts.findAll({
          where: { driver_id: driver.id},
          order: [['is_active', 'DESC']],
          attributes: ['id', 'team_id'],
        });

        return driver.setDataValue('team', driverContracts[0]);
      }));

      return res.status(200).json(drivers);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const driver = await Driver.create(req.body);
      return res.status(201).json(driver);
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

      const driver = await Driver.findByPk(id, {
        include: [
          {
            model: DriverStat,
            as: 'driver_stat',
          },
          {
            model: DriverPicture,
            as: 'driver_picture',
            attributes: ['url', 'filename']
          }
        ],
        attributes: { exclude: ['driver_stat_id'] }
      });

      if (!driver) return res.status(204).json({ errors: ['Driver doesn\'t exists!'] });

      return res.status(200).json(driver);
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

      const driver = await Driver.findByPk(id);
      if (!driver) return res.status(404).json({ errors: ['Driver doesn\'t exists!'] });

      const updatedDriver = await driver.update(req.body);

      return res.status(200).json(updatedDriver);
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

      const driver = await Driver.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!driver) return res.status(404).json({ errors: ['Driver doesn\'t exists!'] });

      await driver.destroy();

      return res.status(200).json({deletedDriver: driver});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new DriverController();

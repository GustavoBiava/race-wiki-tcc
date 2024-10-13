import CareerContracts from '../../models/CareerContracts';
import Driver from '../../models/Driver';
import DriverStat from '../../models/DriverStat';
import DriverPicture from '../../models/Pictures/DriverPicture';
import Team from '../../models/Team';

class DriverPageController {

  async getDrivers(req, res) {
    try {
      const drivers = await Driver.findAll({
        attributes: ['id', 'name', 'surname', 'short_name'],
        include: [
          {
            model: DriverStat,
            as: 'driver_stat',
            attributes: ['number'],
          },
          {
            model: DriverPicture,
            as: 'driver_picture',
            attributes: ['url', 'filename'],
          },
        ]
      });

      if (drivers.length < 0) {
        return res.status(204).json({ message: ['There is no Drivers registered!'] });
      }

      await Promise.all(drivers.map(async driver => {
        const driverContracts = await CareerContracts.findAll({
          where: { driver_id: driver.id, is_active: 1 },
          order: [['created_at', 'ASC']],
        });

        const driverContract = driverContracts[0];

        if (!driverContract) return driver.setDataValue('color', '#757678');

        if (!driverContract.is_active) return driver.setDataValue('color', '#757678');

        const { main_color } = await Team.findOne({
          where: { id: driverContract.team_id }
        });

        return driver.setDataValue('color', main_color);
      }
      ));

      return res.status(200).json(drivers);

    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new DriverPageController();

import CareerContracts from '../../models/CareerContracts';
import Driver from '../../models/Driver';
import DriverPicture from '../../models/Pictures/DriverPicture';
import Team from '../../models/Team';

class ProfilePageController {
  async getUserProfile(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json('Invalid id!');

      const driver = await Driver.findOne({
        where: { id },
        attributes: ['id'],
        include: [
          {
            model: DriverPicture,
            as: 'driver_picture',
            attributes: ['url', 'filename'],
          },
        ],
      });

      if (!driver) {
        return res.status(204).json({ message: ['Invalid Driver!'] });
      }

      await (async function() {
        const driverContracts = await CareerContracts.findAll({
          where: { driver_id: driver.id, is_active: 1 },
          order: [['created_at', 'DESC']],
        });

        const driverContract = driverContracts[0];

        if (!driverContract) return driver.setDataValue('color', null);

        if (!driverContract.is_active) return driver.setDataValue('color', null);

        const { main_color } = await Team.findOne({
          where: { id: driverContract.team_id }
        });

          driver.setDataValue('color', main_color);
        })();

      return res.status(200).json(driver);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new ProfilePageController();

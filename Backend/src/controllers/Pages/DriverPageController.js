import CareerContracts from '../../models/CareerContracts';
import Driver from '../../models/Driver';
import DriverStat from '../../models/DriverStat';
import DriverPicture from '../../models/Pictures/DriverPicture';
import Team from '../../models/Team';
import TeamPicture from '../../models/Pictures/TeamPicture';
import Country from '../../models/Country';
import CountryPicture from '../../models/Pictures/CountryPicture';

class DriverPageController {

  async getDriver(req, res) {
    try {
      const { short_name } = req.params;
      if (!short_name) return res.status(400).json({ message: ['Invalid short name'] });

      const driver = await Driver.findOne({
        attributes: ['id', 'name', 'surname', 'short_name', 'height', 'birth_date', 'birth_place'],
        where: { short_name },
        include: [
          {
            model: DriverStat,
            as: 'driver_stat',
            attributes: { exclude: ['id', 'created_at', 'updated_at', 'driver_id'] },
          },
          {
            model: DriverPicture,
            as: 'driver_picture',
            attributes: ['url', 'filename'],
          },
          {
            model: Country,
            as: 'country',
            attributes: ['name'],
            include: [
              {
                model: CountryPicture,
                as: 'country_picture',
                attributes: ['url', 'filename'],
              }
            ]
          },
        ],
      });

      if (!driver) {
        return res.status(204).json({ message: ['There is no Driver registered!'] });
      }

      await (async function() {
        const driverContracts = await CareerContracts.findAll({
          where: { driver_id: driver.id},
          order: [['created_at', 'DESC']],
          attributes: ['id', 'is_active', 'team_id'],
          include: [
            {
              model: Team,
              attributes: ['short_name', 'main_color'],
              include: [
                {
                  model: TeamPicture,
                  as: 'team_picture',
                  attributes: ['url', 'filename'],
                }
              ]
            }
          ]
        });

        if (driverContracts.length < 1) {
          driver.setDataValue('color', null);
          return driver.setDataValue('teams', null);
        }

        driver.setDataValue('teams', driverContracts);

        const currentContract = driverContracts.find((driverContract => driverContract.is_active === true));

        const { main_color } = await Team.findOne({
          where: { id: currentContract.team_id }
        });

        return driver.setDataValue('color', main_color);
      })();

      return res.status(200).json(driver);

    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new DriverPageController();

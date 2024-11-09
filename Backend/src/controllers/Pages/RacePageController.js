import CareerContracts from '../../models/CareerContracts';
import Circuit from '../../models/Circuit';
import Country from '../../models/Country';
import Driver from '../../models/Driver';
import DriverRaceResult from '../../models/DriverRaceResult';
import CountryPicture from '../../models/Pictures/CountryPicture';
import DriverPicture from '../../models/Pictures/DriverPicture';
import RacePicture from '../../models/Pictures/RacePicture';
import Race from '../../models/Race';
import Team from '../../models/Team';

class RacePageController {

  async getRace(req, res) {
    try {
      const { slug } = req.params;
      if (!slug) return res.status(400).json({ message: ['Invalid Race'] });

      const race = await Race.findOne({
        where: { slug },
        attributes: { exclude: ['slug', 'created_at', 'updated_at', 'season_id', 'circuit_id', 'race_place'] },
        include: [
          {
            model: Circuit,
            as: 'circuit',
            attributes: ['name', 'first_apparition', 'circuit_length']
          },
          {
            model: Country,
            as: 'place',
            attributes: ['name'],
            include: [
              {
                model: CountryPicture,
                as: 'country_picture',
                attributes: ['url', 'filename']
              }
            ]
          },
          {
            model: RacePicture,
            as: 'race_picture',
            attributes: ['url', 'filename']
          },
          {
            model: Driver,
            as: 'winner_driver',
            attributes: ['name', 'surname']
          },
          {
            model: Driver,
            as: 'position_pole',
            attributes: ['name', 'surname']
          },
        ]
      });

      if (!race) return res.status(204).json({ message: ['Invalid Race'] });


      let position = 1;

      const racePodium = await DriverRaceResult.findAll({
        where: { race_id: race.id },
        order: [['points', 'DESC']],
        attributes: ['points', 'total_race_duration', 'interval_to_leader', 'laps', 'driver_id'],
        limit: 3,
        include: [
          {
            model: Driver,
            attributes: ['name', 'surname', 'short_name'],
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['name'],
                include: [
                  {
                    model: CountryPicture,
                    as: 'country_picture',
                    attributes: ['url', 'filename']
                  }
                ]
              },
              {
                model: DriverPicture,
                as: 'driver_picture',
                attributes: ['url', 'filename']
              }
            ]
          }
        ]
      });

      racePodium.map((leader) => {
        leader.setDataValue('position', position);
        position++;
      });

      const raceResults = await DriverRaceResult.findAll({
        where: { race_id: race.id },
        order: [['points', 'DESC']],
        attributes: ['points', 'total_race_duration', 'interval_to_leader', 'laps', 'driver_id'],
        offset: 3,
        include: [
          {
            model: Driver,
            attributes: ['name', 'surname', 'short_name']
          }
        ]
      });

      raceResults.map((result) => {
        result.setDataValue('position', position);
        position++;
      });

      race.setDataValue('race_podium', racePodium);
      race.setDataValue('race_results', raceResults);

      await Promise.all(racePodium.map(async leader => {

        const driverContracts = await CareerContracts.findAll({
          where: { driver_id: leader.driver_id, is_active: 1 },
          order: [['created_at', 'DESC']],
        });

        const driverContract = driverContracts[0];

        if (!driverContract) return leader.setDataValue('color', null);

        if (!driverContract.is_active) return leader.setDataValue('color', null);

        const { main_color } = await Team.findOne({
          where: { id: driverContract.team_id }
        });

        return leader.setDataValue('color', main_color);
      }
      ));

      await Promise.all(raceResults.map(async result => {

        const driverContracts = await CareerContracts.findAll({
          where: { driver_id: result.driver_id, is_active: 1 },
          order: [['created_at', 'DESC']],
        });

        const driverContract = driverContracts[0];

        if (!driverContract) return result.setDataValue('color', null);

        if (!driverContract.is_active) return result.setDataValue('color', null);

        const { main_color } = await Team.findOne({
          where: { id: driverContract.team_id }
        });

        return result.setDataValue('color', main_color);
      }
      ));

      return res.status(200).json(race);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }


}

export default new RacePageController();

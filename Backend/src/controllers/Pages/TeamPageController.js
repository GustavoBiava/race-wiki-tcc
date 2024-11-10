import CareerContracts from '../../models/CareerContracts';
import Driver from '../../models/Driver';
import Team from '../../models/Team';
import TeamPicture from '../../models/Pictures/TeamPicture';
import DriverPicture from '../../models/Pictures/DriverPicture';
import Country from '../../models/Country';
import CountryPicture from '../../models/Pictures/CountryPicture';
import Season from '../../models/Season';
import Race from '../../models/Race';
import TeamRaceResult from '../../models/TeamRaceResult';

class TeamPageController {

  async getTeam(req, res) {
    try {
      const { short_name } = req.params;
      if (!short_name) return res.status(400).json({ message: ['Invalid Team'] });

      const team = await Team.findOne({
        attributes: ['id', 'name', 'description', 'first_participation', 'team_chief', 'technical_chief', 'constructors_championships', 'highest_race_finish', 'times_highest_finish', 'fastest_laps', 'pole_positions', 'power_unit', 'main_color'],
        where: { short_name },
        include: [
          {
            model: TeamPicture,
            as: 'team_picture',
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

      if (!team) {
        return res.status(204).json({ message: ['There is no Team registered!'] });
      }

      const drivers = await CareerContracts.findAll({
        where: { team_id: team.id, is_active: 1},
        order: [['created_at', 'DESC']],
        attributes: ['id', 'is_active'],
        include: [
          {
            model: Driver,
            attributes: ['name', 'surname', 'short_name'],
            include: [
              {
                model: DriverPicture,
                as: 'driver_picture',
                attributes: ['url', 'filename'],
              }
            ]
          }
        ]
      });

      team.setDataValue('drivers', drivers);

      return res.status(200).json(team);

    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async getTeamResults(req, res) {
    try {
      const { short_name, year } = req.params;

      if (!short_name) return res.status(400).json({ message: ['Invalid short name'] });
      if (!year) return res.status(400).json({ message: ['Invalid season'] });

      const season = await Season.findOne({
        where: { year },
        attributes: ['id']
      });

      if (!season) return res.status(204).json({ message: ['This season does\'t exists!'] });

      const team = await Team.findOne({
        attributes: ['id'],
        where: { short_name },
      });

      if (!team) return res.status(204).json({ message: ['This team does\'t exists!'] });

      const teamResults = await TeamRaceResult.findAll({
        where: { team_id: team.id },
        attributes: ['laps', 'points'],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Race,
            attributes: ['name', 'date', 'slug'],
            where: { season_id: season.id }
          }
        ]
      });

      return res.status(200).json(teamResults);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new TeamPageController();

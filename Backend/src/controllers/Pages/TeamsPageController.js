import Country from "../../models/Country";
import CountryPicture from "../../models/Pictures/CountryPicture";
import Team from "../../models/Team";
import TeamPicture from "../../models/Pictures/TeamPicture";

class TeamsPageController {

  async getTeams(req, res) {
    try {
      const teams = await Team.findAll({
        attributes: ['id', 'name', 'constructors_championships', 'main_color', 'short_name'],
        order: [['constructors_championships', 'DESC']],
        include: [
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
          {
            model: TeamPicture,
            as: 'team_picture',
            attributes: ['url', 'filename'],
          },
        ]
      });

      if (teams.length < 1) {
        return res.status(204).json({ message: ['There is no Teams registered!'] });
      }

      return res.status(200).json(teams);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new TeamsPageController();

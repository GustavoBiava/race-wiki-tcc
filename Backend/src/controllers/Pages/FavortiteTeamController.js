import TeamPicture from "../../models/Pictures/TeamPicture";
import Team from "../../models/Team";

class FavoriteTeamController {
  async getTeams(req, res) {
    try {
      const teams = await Team.findAll({
        attributes: ['id', 'name', 'main_color'],
        order: [['name', 'ASC']],
        include: [
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

export default new FavoriteTeamController();

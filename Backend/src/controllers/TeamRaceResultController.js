import Race from "../models/Race";
import Team from "../models/Team";
import TeamRaceResult from "../models/TeamRaceResult";

class TeamRaceResultController {

  async index(req, res) {
    try {
      const teamRaceResults = await TeamRaceResult.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (teamRaceResults.length < 0) {
        return res.status(204).json({ message: ['There is no TeamRaceResults registered!'] });
      }

      return res.status(200).json(teamRaceResults);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const teamRaceResult = await TeamRaceResult.create(req.body);
      return res.status(201).json(teamRaceResult);
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

      const teamRaceResult = await TeamRaceResult.findByPk(id, {
        include: [
          { model: Team},
          { model: Race},
        ],
        attributes: { exclude: ['race_id', 'team_id'] }
      });

      if (!teamRaceResult) return res.status(404).json({ errors: ['TeamRaceResult doesn\'t exists!'] });

      return res.status(200).json(teamRaceResult);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async showByRaceAndTeam(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const { team_id } = req.params;
      if (!team_id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const teamRaceResult = await TeamRaceResult.findOne({
        where: { team_id, race_id: id },
        include: [
          { model: Team},
          { model: Race},
        ],
      });

      if (!teamRaceResult) return res.status(204).json({ errors: ['TeamRaceResult doesn\'t exists!'] });

      return res.status(200).json(teamRaceResult);
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

      const teamRaceResult = await TeamRaceResult.findByPk(id);
      if (!teamRaceResult) return res.status(404).json({ errors: ['TeamRaceResult doesn\'t exists!'] });

      const updatedTeamRaceResult = await teamRaceResult.update(req.body);

      return res.status(200).json(updatedTeamRaceResult);
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

      const teamRaceResult = await TeamRaceResult.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!teamRaceResult) return res.status(404).json({ errors: ['TeamRaceResult doesn\'t exists!'] });

      await teamRaceResult.destroy();

      return res.status(200).json({deletedTeamRaceResult: teamRaceResult});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new TeamRaceResultController();

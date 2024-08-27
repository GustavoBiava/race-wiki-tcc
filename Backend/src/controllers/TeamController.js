import Team from "../models/Team";

class TeamController {

  async index(req, res) {
    try {
      const teams = await Team.findAll({
        attributes: { exclude: ['created_at', 'updated_at']},
        order: [ ['created_at', 'DESC'] ],
      });

      if (teams.length < 0) {
        return res.status(204).json({ message: ['There is no Teams registered!'] });
      }

      return res.status(200).json(teams);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const team = await Team.create(req.body);
      return res.status(201).json(team);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const team = await Team.findByPk(id);

      if (!team) return res.status(404).json({ errors: ['Team doesn\'t exists!'] });

      return res.status(200).json(team);
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

      const team = await Team.findByPk(id);
      if (!team) return res.status(404).json({ errors: ['Team doesn\'t exists!'] });

      const updatedTeam = await team.update(req.body);

      return res.status(200).json(updatedTeam);
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

      const team = await Team.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!team) return res.status(404).json({ errors: ['Team doesn\'t exists!'] });

      await team.destroy();

      return res.status(200).json({deletedTeam: team});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new TeamController();

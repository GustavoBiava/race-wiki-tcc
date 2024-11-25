import TeamClassification from '../models/TeamClassification';
import Season from '../models/Season';
import Team from '../models/Team';

class TeamClassificationController {

  async index(req, res) {
    try {
      const teamClassifications = await TeamClassification.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (teamClassifications.length < 0) {
        return res.status(204).json({ message: ['There is no TeamClassifications registered!'] });
      }

      return res.status(200).json(teamClassifications);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const teamClassification = await TeamClassification.create(req.body);
      return res.status(201).json(teamClassification);
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

      const teamClassification = await TeamClassification.findByPk(id, {
        include: [
          { model: Team},
          { model: Season},
        ],
        attributes: { exclude: ['season_id', 'team_id'] }
      });

      if (!teamClassification) return res.status(404).json({ errors: ['TeamClassification doesn\'t exists!'] });

      return res.status(200).json(teamClassification);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }


  async showByTeam(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const teamClassification = await TeamClassification.findOne({
        where: { team_id: id },
        include: [
          { model: Team},
          { model: Season},
        ],
      });

      if (!teamClassification) return res.status(204).json({ errors: ['TeamClassification doesn\'t exists!'] });

      return res.status(200).json(teamClassification);
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

      const teamClassification = await TeamClassification.findByPk(id);
      if (!teamClassification) return res.status(404).json({ errors: ['TeamClassification doesn\'t exists!'] });

      const updatedTeamClassification = await teamClassification.update(req.body);

      return res.status(200).json(updatedTeamClassification);
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

      const teamClassification = await TeamClassification.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!teamClassification) return res.status(404).json({ errors: ['TeamClassification doesn\'t exists!'] });

      await teamClassification.destroy();

      return res.status(200).json({deletedTeamClassification: teamClassification});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new TeamClassificationController();

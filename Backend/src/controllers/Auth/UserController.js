import User from "../../models/Auth/User";
import Driver from "../../models/Driver";
import Team from "../../models/Team";

class UserController {

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['created_at', 'updated_at', 'password_hash'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (users.length < 0) {
        return res.status(204).json({ message: ['There is no Users registered!'] });
      }

      return res.status(200).json(users);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const { id, nickname, name, surname, birh_date, email, type, status, race_level, race_points, favorite_driver, favorite_team, created_at, updated_at } = await User.create(req.body);
      return res.status(201).json({
        id,
        nickname,
        name,
        surname,
        email,
        birh_date,
        type,
        status,
        race_level,
        race_points,
        favorite_driver,
        favorite_team,
        created_at,
        updated_at
      });
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error! Try check the Foreign Keys or the ENUM fields value (Type and Status).'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const user = await User.findByPk(id, {
        include: [
          { model: Team },
          { model: Driver },
        ],
        attributes: { exclude: ['favorite_driver', 'favorite_team' ] }
      });

      if (!user) return res.status(404).json({ errors: ['User doesn\'t exists!'] });

      return res.status(200).json(user);
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

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ errors: ['User doesn\'t exists!'] });

      const { nickname, name, surname, birh_date, email, type, status, race_level, race_points, favorite_driver, favorite_team, created_at, updated_at } = await user.update(req.body);

      return res.status(200).json({
        id,
        nickname,
        name,
        surname,
        email,
        birh_date,
        type,
        status,
        race_level,
        race_points,
        favorite_driver,
        favorite_team,
        created_at,
        updated_at
      });
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error! Try check the Foreign Keys or the ENUM fields value (Type and Status).'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const user = await User.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at', 'password_hash']}});
      if (!user) return res.status(404).json({ errors: ['User doesn\'t exists!'] });

      await user.destroy();

      return res.status(200).json({deletedUser: user});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new UserController();

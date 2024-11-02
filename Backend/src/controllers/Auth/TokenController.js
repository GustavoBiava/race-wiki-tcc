import jwt from 'jsonwebtoken';

import User from '../../models/Auth/User';

class TokenController {

  async store(req ,res) {
    try {
      const { email = '', password = '' } = req.body;
      if (!email || !password) return res.status(401).json({ errors: ['Invalid credentials!'] });

      const user = await User.findOne({
        where: { email },
        attributes: ['id', 'email', 'nickname', 'type', 'status', 'race_level', 'race_points', 'password_hash', 'favorite_driver'],
      });
      if (!user) return res.status(404).json({ errors: ['User doesn\'t exists!'] });

      if (!(await user.validatePassword(password))) return res.status(401).json({ errors: ['Incorrect password!'] });

      const { id, nickname, type, status, race_level, race_points, favorite_driver } = user;

      const token = jwt.sign({ id, email, nickname, type, status, race_level, race_points, favorite_driver }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.status(200).json(
        {
          token,
          user: {
            id,
            nickname,
            type,
            status,
            race_level,
            race_points,
            favorite_driver,
          }
         });
    }
    catch (err) {
      console.log(err)
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new TokenController();

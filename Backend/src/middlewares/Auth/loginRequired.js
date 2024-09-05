import jwt from 'jsonwebtoken';
import User from '../../models/Auth/User';

export const loginRequired = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ errors: ['Login required!'] });

  const [, token] = authorization.split(' ');

  try {
    	const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id, email, nickname, type, status, race_level, race_points } = payload;

      const user = await User.findOne({ where: { id, email } });
      if (!user) return res.status(404).json({ errors: ['User doesn\'t exists!'] });

      req.user = {
        id,
        email,
        nickname,
        type,
        status,
        race_level,
        race_points
      };

      return next();

  }
  catch {
    return res.status(401).json({ errors: ['Invalid or expirated token!'] });
  }

}

export const adminRequired = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ errors: ['Login required!'] });

  const [, token] = authorization.split(' ');

  try {
    	const payload = jwt.verify(token, process.env.TOKEN_SECRET);
      const { id, email, nickname, type, status, race_level, race_points } = payload;

      if (type !== 'ADMIN') return res.status(400).json({ errors: ['Only administrators permited!'] });

      const user = await User.findOne({ where: { id, email } });
      if (!user) return res.status(404).json({ errors: ['User doesn\'t exists!'] });

      req.user = {
        id,
        email,
        nickname,
        type,
        status,
        race_level,
        race_points
      };

      return next();

  }
  catch {
    return res.status(401).json({ errors: ['Invalid or expirated token!'] });
  }
}

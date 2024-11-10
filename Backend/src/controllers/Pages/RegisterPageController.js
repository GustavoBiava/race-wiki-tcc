import User from '../../models/Auth/User';

class RegisterPageController {

    async emailValidation(req, res) {
        try {
          const { email } = req.query;
          if (!email) return res.status(400).json({ message: ['Invalid E-mail!'] });

          const user = await User.findOne(
            { where: { email },
            attributes: ['email'],
          });
          if (!user) return res.status(204).json();

          return res.status(200).json({ message: ['O E-mail já foi cadastrado!'] });
        }
        catch (err) {
          const errors = err.errors || [{ message: 'Fatal Error!'}];
          return res.status(400).json({ errors: errors.map(e => e.message) });
        }
    }

    async nicknameValidation(req, res) {
      try {
        const { nickname } = req.query;
        if (!nickname) return res.status(400).json({ message: ['Invalid nickname!'] });

        const user = await User.findOne({
          where: { nickname },
          attributes: ['nickname'],
        });
        
        if (!user) return res.status(204).json();

        return res.status(200).json({ message: ['O Nickname já está em uso!'] });
      }
      catch (err) {
        const errors = err.errors || [{ message: 'Fatal Error!'}];
        return res.status(400).json({ errors: errors.map(e => e.message) });
      }
  }
}

export default new RegisterPageController();

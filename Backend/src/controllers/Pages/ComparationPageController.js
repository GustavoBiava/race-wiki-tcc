import Driver from '../../models/Driver';

class ComparationPageController {

  async getDrivers(req, res) {
    try {
      const drivers = await Driver.findAll({
        attributes: ['id', 'name', 'surname', 'short_name'],
      });

      return res.status(200).json(drivers);

    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new ComparationPageController();

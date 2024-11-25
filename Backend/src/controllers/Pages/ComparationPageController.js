import Driver from '../../models/Driver';
import Race from '../../models/Race';
import DriverRaceResult from '../../models/DriverRaceResult';

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

  async getData(req, res) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: ['Invalid Id'] });

    try {
      const data = await DriverRaceResult.findAll({
        where: { driver_id: id },
        order: [['created_at', 'ASC']],
        attributes: ['points'],
        include: [
          {
            model: Race,
            attributes: ['name'],
          }
        ]
      });

      return res.status(200).json(data);

    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new ComparationPageController();

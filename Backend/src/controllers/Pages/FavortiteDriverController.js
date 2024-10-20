import CareerContracts from "../../models/CareerContracts";
import Driver from "../../models/Driver";
import Team from "../../models/Team";
import DriverPicture from "../../models/Pictures/DriverPicture";

class FavoriteDriverController {
  async getDrivers(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: ['Invalid ID!'] });

      const team = await Team.findByPk(id);
      if (!team) return res.status(404).json({ errors: ['Team doesn\'t exists!'] });

      const careerContracts = await CareerContracts.findAll({
        where: { team_id: id },
        attributes: ['is_active'],
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Driver,
            attributes: ['id','name', 'surname'],
            include: [
              {
                model: DriverPicture,
                as: 'driver_picture',
                attributes: ['url', 'filename'],
              }
            ]
          },
          {
            model: Team,
            attributes: ['main_color'],
          }
        ],
      });

      if (careerContracts < 1) return res.status(404).json({ errors: ['Team doesn\'t have drivers!'] });

      return res.status(200).json(careerContracts);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new FavoriteDriverController();

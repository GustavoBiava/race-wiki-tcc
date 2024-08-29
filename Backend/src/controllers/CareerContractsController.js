import CareerContracts from "../models/CareerContracts";
import Driver from "../models/Driver";
import Team from "../models/Team";

class CareerContractsController {

  async index(req, res) {
    try {
      const careerContracts = await CareerContracts.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (careerContracts.length < 0) {
        return res.status(204).json({ message: ['There is no CareerContracts registered!'] });
      }

      return res.status(200).json(careerContracts);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const careerContract = await CareerContracts.create(req.body);
      return res.status(201).json(careerContract);
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

      const careerContract = await CareerContracts.findByPk(id, {
        include: [Driver, Team ],
        attributes: { exclude: ['team_id', 'driver_id'] }
      });

      if (!careerContract) return res.status(404).json({ errors: ['CareerContract doesn\'t exists!'] });

      return res.status(200).json(careerContract);
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

      const careerContract = await CareerContracts.findByPk(id);
      if (!careerContract) return res.status(404).json({ errors: ['CareerContract doesn\'t exists!'] });

      const updatedContract = await careerContract.update(req.body);

      return res.status(200).json(updatedContract);
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

      const careerContract = await CareerContracts.findByPk(id, { attributes: {exclude: ['created_at', 'updated_at']}});
      if (!careerContract) return res.status(404).json({ errors: ['CarrerContract doesn\'t exists!'] });

      await careerContract.destroy();

      return res.status(200).json({deletedContract: careerContract});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new CareerContractsController();

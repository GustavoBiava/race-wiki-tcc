import Circuit from "../models/Circuit";

class CircuitController {

  async index(req, res) {
    try {
      const circuits = await Circuit.findAll({
        attributes: ['id', 'name', 'first_apparition', 'circuit_length', 'fastest_lap_record',],
        order: [ ['created_at', 'DESC'] ],
      });

      if (circuits.length < 0) {
        return res.status(204).json({ message: ['There is no Circuits registered!'] });
      }

      return res.status(200).json(circuits);
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const circuit = await Circuit.create(req.body);
      return res.status(201).json(circuit);
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const circuit = await Circuit.findByPk(id);
      if (!circuit) return res.status(404).json({ errors: ['Circuit doesn\'t exists!'] });

      return res.status(200).json(circuit);
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const circuit = await Circuit.findByPk(id);
      if (!circuit) return res.status(404).json({ errors: ['Circuit doesn\'t exists!'] });

      const updatedCircuit = await circuit.update(req.body);

      return res.status(200).json({updatedCircuit});
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const circuit = await Circuit.findByPk(id, { attributes: ['id', 'name', 'first_apparition', 'circuit_length', 'fastest_lap_record']});
      if (!circuit) return res.status(404).json({ errors: ['Circuit doesn\'t exists!'] });

      await circuit.destroy();

      return res.status(200).json({deletedCircuit: circuit});
    }
    catch (err) {
      return res.status(400).json({ errors: err.errors.map(e => e.message) });
    }
  }
}

export default new CircuitController();

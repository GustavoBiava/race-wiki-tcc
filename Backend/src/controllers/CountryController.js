import Country from "../models/Country";

class CountryController {

  async index(req, res) {
    try {
      const countries = await Country.findAll({
        attributes: { exclude: ['created_at', 'updated_at'] },
        order: [ ['created_at', 'DESC'] ],
      });

      if (countries.length < 0) {
        return res.status(204).json({ message: ['There is no Countries registered!'] });
      }

      return res.status(200).json(countries);
    }
    catch (err) {
      console.log(err)
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async store(req, res) {
    try {
      if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

      const country = await Country.create(req.body);
      return res.status(201).json(country);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const country = await Country.findByPk(id);
      if (!country) return res.status(404).json({ errors: ['Country doesn\'t exists!'] });

      return res.status(200).json(country);
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

      const country = await Country.findByPk(id);
      if (!country) return res.status(404).json({ errors: ['Country doesn\'t exists!'] });

      const updatedCountry = await country.update(req.body);

      return res.status(200).json({updatedCountry});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ['Invalid ID!'] });

      const country = await Country.findByPk(id, { attributes: { exclude: ['created_at', 'updated_at'] } });
      if (!country) return res.status(404).json({ errors: ['Country doesn\'t exists!'] });

      await country.destroy();

      return res.status(200).json({deletedCountry: country});
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }
}

export default new CountryController();

import multer from "multer";

import multerConfig from '../../config/multer';

import DriverPicture from "../../models/Pictures/DriverPicture";
import CountryPicture from '../../models/Pictures/CountryPicture';

import Driver from "../../models/Driver";
import Country from "../../models/Country";

const upload = multer(multerConfig).single('archive');

class PicturesController {

  storeDriver(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json({ errors: [err.code] });

      try {
        if (!req.file) return res.status(400).json({ errors: ['Picture not found!'] });
        if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

        const { originalname, filename } = req.file;

        const { driver_id } = req.body;
        if (!driver_id) return res.status(400).json({ errors: ['Invalid id!'] });

        const driver = await Driver.findOne({ where: { id: driver_id } });

        if (!driver) return res.status(400).json({ errors: ['Invalid Driver!'] });

        const driverPicture = await DriverPicture.create({ original_name: originalname, filename, driver_id });
        return res.status(200).json(driverPicture);
      }
      catch (err) {
        const errors = err.errors || [{ message: 'Fatal Error!'}];
        return res.status(400).json({ errors: errors.map(e => e.message) });
      }
    });
  }

  storeCountry(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json({ errors: [err.code] });

      try {
        if (!req.file) return res.status(400).json({ errors: ['Picture not found!'] });
        if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

        const { originalname, filename } = req.file;

        const { country_id } = req.body;
        if (!country_id) return res.status(400).json({ errors: ['Invalid id!'] });

        const country = await Country.findOne({ where: { id: country_id } });

        if (!country) return res.status(400).json({ errors: ['Invalid Country!'] });

        const countryPicture = await CountryPicture.create({ original_name: originalname, filename, country_id });
        return res.status(200).json(countryPicture);
      }
      catch (err) {
        const errors = err.errors || [{ message: 'Fatal Error!'}];
        return res.status(400).json({ errors: errors.map(e => e.message) });
      }
    });
  }

}

export default new PicturesController();
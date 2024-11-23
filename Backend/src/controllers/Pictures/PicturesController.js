import multer from "multer";

import multerConfig from '../../config/multer';

import DriverPicture from "../../models/Pictures/DriverPicture";
import CountryPicture from '../../models/Pictures/CountryPicture';
import TeamPicture from '../../models/Pictures/TeamPicture';
import RacePicture from '../../models/Pictures/RacePicture';
import PublicationPicture from '../../models/Pictures/PublicationPicture';

import Driver from "../../models/Driver";
import Country from "../../models/Country";
import Team from "../../models/Team";
import Race from "../../models/Race";
import Publication from "../../models/Social/Publication";

const upload = multer(multerConfig).single('archive');
const uploadFiles = multer(multerConfig).array('archives', 10);

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

  updateCountry(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json({ errors: [err.code] });

      try {
        if (!req.file) return res.status(400).json({ errors: ['Picture not found!'] });
        if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

        const { originalname, filename } = req.file;

        const { country_id } = req.body;
        if (!country_id) return res.status(400).json({ errors: ['Invalid id!'] });

        const countryPicture = await CountryPicture.findOne({ where: { country_id } });

        if (!countryPicture) return res.status(400).json({ errors: ['Invalid Country Picture!'] });

        const updatedCountryPicture = await countryPicture.update({ original_name: originalname, filename, country_id });
        return res.status(200).json(updatedCountryPicture);
      }
      catch (err) {
        const errors = err.errors || [{ message: 'Fatal Error!'}];
        return res.status(400).json({ errors: errors.map(e => e.message) });
      }
    });
  }

  storeTeam(req, res) {
    return upload(req, res, async (err) => {
      if (err) return res.status(400).json({ errors: [err.code] });

      try {
        if (!req.file) return res.status(400).json({ errors: ['Picture not found!'] });
        if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

        const { originalname, filename } = req.file;

        const { team_id } = req.body;
        if (!team_id) return res.status(400).json({ errors: ['Invalid id!'] });

        const team = await Team.findOne({ where: { id: team_id } });

        if (!team) return res.status(400).json({ errors: ['Invalid Team!'] });

        const teamPicture = await TeamPicture.create({ original_name: originalname, filename, team_id });
        return res.status(200).json(teamPicture);
      }
      catch (err) {
        const errors = err.errors || [{ message: 'Fatal Error!'}];
        return res.status(400).json({ errors: errors.map(e => e.message) });
      }
    });
  }

  storeRace(req, res) {
    return uploadFiles(req, res, async (err) => {
      if (err) return res.status(400).json({ errors: [err.code] });

      try {
        if (!req.files) return res.status(400).json({ errors: ['Picture(s) not found!'] });
        if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

        const { race_id } = req.body;
        if (!race_id) return res.status(400).json({ errors: ['Invalid id!'] });

        const race = await Race.findOne({ where: { id: race_id } });
        if (!race) return res.status(400).json({ errors: ['Invalid Race!'] });

        const racePictures = [];

        await Promise.all(req.files.map(async (file) => {
          const { originalname, filename } = file;

          const racePicture = await RacePicture.create({ original_name: originalname, filename, race_id });

          return racePictures.push(racePicture);
        }));

        return res.status(200).json(racePictures);
      }
      catch (err) {
        const errors = err.errors || [{ message: 'Fatal Error!'}];
        return res.status(400).json({ errors: errors.map(e => e.message) });
      }
    });
  }

  storePublication(req, res) {
    return uploadFiles(req, res, async (err) => {
      if (err) return res.status(400).json({ errors: [err.code] });

      try {
        if (!req.files) return res.status(400).json({ errors: ['Picture(s) not found!'] });
        if (!req.body) return res.status(400).json({ errors: ['Request body can\'t be null'] });

        const { publication_id } = req.body;
        if (!publication_id) return res.status(400).json({ errors: ['Invalid id!'] });

        const publication = await Publication.findOne({ where: { id: publication_id } });
        if (!publication) return res.status(400).json({ errors: ['Invalid Publication!'] });

        const publicationPictures = [];

        await Promise.all(req.files.map(async (file) => {
          const { originalname, filename } = file;

          const publicationPicture = await PublicationPicture.create({ original_name: originalname, filename, publication_id });

          return publicationPictures.push(publicationPicture);
        }));

        return res.status(200).json(publicationPictures);
      }
      catch (err) {
        const errors = err.errors || [{ message: 'Fatal Error!'}];
        return res.status(400).json({ errors: errors.map(e => e.message) });
      }
    });
  }

}

export default new PicturesController();

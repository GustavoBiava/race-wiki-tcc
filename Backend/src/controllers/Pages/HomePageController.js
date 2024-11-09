import Race from "../../models/Race";
import Country from "../../models/Country";
import User from '../../models/Auth/User';
import TagsPublication from '../../models/Social/TagsPublication';
import Tag from '../../models/Social/Tag';
import CountryPicture from "../../models/Pictures/CountryPicture";
import RacePicture from "../../models/Pictures/RacePicture";
import Publication from "../../models/Social/Publication";
import PublicationPicture from "../../models/Pictures/PublicationPicture";
import Season from "../../models/Season";
import DriverClassification from '../../models/DriverClassification';
import TeamClassification from '../../models/TeamClassification';
import Driver from '../../models/Driver';
import DriverPicture from "../../models/Pictures/DriverPicture";
import TeamPicture from "../../models/Pictures/TeamPicture";
import CareerContracts from '../../models/CareerContracts';
import Team from '../../models/Team';

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class HomePageController {

  async getRaces(req, res) {
    try {

      const { year } = req.params;
      if (!year) return res.status(400).json({ message: ['Invalid season'] });

      const season = await Season.findOne({
        where: { year },
        attributes: ['id']
      });

      if (!season) return res.status(204).json({ message: ['This season does\'t exists!'] });

      const races = await Race.findAll({
        attributes: ['name', 'date', 'slug'],
        order: [['date', 'ASC']],
        where: { season_id: season.id },
        include: [
          {
            model: Country,
            as: 'place',
            attributes: ['name'],
            include: [
              {
                model: CountryPicture,
                as: 'country_picture',
                attributes: ['url', 'filename'],
              }
            ]
          },
          {
            model: RacePicture,
            as: 'race_picture',
            attributes: ['url', 'filename'],

          }
        ]
      });

      if (races.length < 1) {
        return res.status(204).json({ message: ['There is no Races registered!'] });
      }

      races.map((race) => {
        race.setDataValue('name', race.name.toUpperCase());
        race.place.setDataValue('name', race.place.name.toUpperCase());

        if (race.race_picture.length > 1) {
          const index = rand(0, race.race_picture.length - 1);
          race.setDataValue('race_picture', race.race_picture[index]);
        }

      });

      return res.status(200).json(races);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async getPublications(req, res) {
    try {
      const publications = await Publication.findAll({
        attributes: ['id', 'title', 'slug', 'created_at'],
        order: [['created_at', 'DESC']],
        limit: 6,
        include: [
          {
            model: PublicationPicture,
            as: 'publication_picture',
            attributes: ['url', 'filename'],
            limit: 1
          },
          {
            model: User,
            as: 'publication_author',
            attributes: ['nickname'],
          },
        ]
      });

      if (publications.length < 1) {
        return res.status(204).json({ message: ['There is no Publications registered!'] });
      }

      await Promise.all(publications.map(async (publication) => {
        const tags = [];
        const tagsPublications = await TagsPublication.findAll({
          where: { publication_id: publication.id },
          attributes: ['id'],
          include: [
            {
              model: Tag,
              attributes: ['tag_name', 'slug']
            }
          ]
        });

        tagsPublications.forEach((tagPublication) => {
          tags.push(tagPublication.Tag);
        });

        publication.setDataValue('tags', tags);
      }));

      return res.status(200).json(publications);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async getDriverClassificationLeaders(req, res) {
    try {
      const { year } = req.params;
      if (!year) return res.status(400).json({ message: ['Invalid year!'] });

      const season = await Season.findOne({
        where: { year },
        attributes: ['id']
      });
      if (!season) return res.status(204).json({ message: ['This season does\'t exists!'] });

      const driverLeaders = await DriverClassification.findAll({
        where: { season_id: season.id },
        attributes: ['points', 'driver_id'],
        order: [['points', 'DESC']],
        limit: 3,
        include: [
          {
            model: Driver,
            attributes: ['name', 'surname', 'short_name'],
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['name'],
                include: [
                  {
                    model: CountryPicture,
                    as: 'country_picture',
                    attributes: ['url', 'filename'],
                  }
                ]
              },
              {
                model: DriverPicture,
                as: 'driver_picture',
                attributes: ['url', 'filename'],
              }
            ]
          }
        ]
      });

      let position = 1;

      await Promise.all(driverLeaders.map(async driverLeader => {
        driverLeader.setDataValue('position', position);
        position++;
        const driverContracts = await CareerContracts.findAll({
          where: { driver_id: driverLeader.driver_id, is_active: 1 },
          order: [['created_at', 'DESC']],
        });

        const driverContract = driverContracts[0];

        if (!driverContract) return driverLeader.setDataValue('color', null);

        if (!driverContract.is_active) return driverLeader.setDataValue('color', null);

        const { main_color } = await Team.findOne({
          where: { id: driverContract.team_id }
        });

        return driverLeader.setDataValue('color', main_color);
      }
      ));

      return res.status(200).json(driverLeaders);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async getDriverClassification(req, res) {
    try {
      const { year } = req.params;
      if (!year) return res.status(400).json({ message: ['Invalid year!'] });

      const season = await Season.findOne({
        where: { year },
        attributes: ['id']
      });
      if (!season) return res.status(400).json({ message: ['This season does\'t exists!'] });

      const driverClassifications = await DriverClassification.findAll({
        where: { season_id: season.id },
        attributes: ['points', 'driver_id'],
        offset: 3,
        order: [['points', 'DESC']],
        include: [
          {
            model: Driver,
            attributes: ['name', 'surname', 'short_name'],
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['name'],
                include: [
                  {
                    model: CountryPicture,
                    as: 'country_picture',
                    attributes: ['url', 'filename'],
                  }
                ]
              },
            ]
          }
        ]
      });

      let position = 4;

      await Promise.all(driverClassifications.map(async driverClassification => {
        driverClassification.setDataValue('position', position);
        position++;

        const driverContracts = await CareerContracts.findAll({
          where: { driver_id: driverClassification.driver_id, is_active: 1 },
          order: [['created_at', 'DESC']],
        });

        const driverContract = driverContracts[0];

        if (!driverContract) return driverClassification.setDataValue('color', null);

        if (!driverContract.is_active) return driverClassification.setDataValue('color', null);

        const { main_color, short_name, name } = await Team.findOne({
          where: { id: driverContract.team_id }
        });

        driverClassification.setDataValue('color', main_color);
        return driverClassification.setDataValue('team', { short_name, name });
      }
      ));

      return res.status(200).json(driverClassifications);
    }
    catch (err) {
      console.log(err)
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async getTeamClassificationLeaders(req, res) {
    try {
      const { year } = req.params;
      if (!year) return res.status(400).json({ message: ['Invalid year!'] });

      const season = await Season.findOne({
        where: { year },
        attributes: ['id']
      });
      if (!season) return res.status(400).json({ message: ['This season does\'t exists!'] });

      const teamLeaders = await TeamClassification.findAll({
        where: { season_id: season.id },
        attributes: ['points', 'team_id'],
        order: [['points', 'DESC']],
        limit: 3,
        include: [
          {
            model: Team,
            attributes: ['name', 'main_color', 'short_name'],
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['name'],
                include: [
                  {
                    model: CountryPicture,
                    as: 'country_picture',
                    attributes: ['url', 'filename'],
                  }
                ]
              },
              {
                model: TeamPicture,
                as: 'team_picture',
                attributes: ['url', 'filename'],
              }
            ]
          }
        ]
      });

      let position = 1;

      await Promise.all(teamLeaders.map(async teamLeader => {
        teamLeader.setDataValue('position', position);
        return position++;
      }));

      return res.status(200).json(teamLeaders);
    }
    catch (err) {
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

  async getTeamClassification(req, res) {
    try {
      const { year } = req.params;
      if (!year) return res.status(400).json({ message: ['Invalid year!'] });

      const season = await Season.findOne({
        where: { year },
        attributes: ['id']
      });
      if (!season) return res.status(400).json({ message: ['This season does\'t exists!'] });

      const teamClassifications = await TeamClassification.findAll({
        where: { season_id: season.id },
        attributes: ['points', 'team_id'],
        offset: 3,
        order: [['points', 'DESC']],
        include: [
          {
            model: Team,
            attributes: ['name', 'main_color', 'short_name'],
            include: [
              {
                model: Country,
                as: 'country',
                attributes: ['name'],
                include: [
                  {
                    model: CountryPicture,
                    as: 'country_picture',
                    attributes: ['url', 'filename'],
                  }
                ]
              },
            ]
          }
        ]
      });

      let position = 4;

      await Promise.all(teamClassifications.map(async teamClassification => {
        teamClassification.setDataValue('position', position);
        return position++;
      }
      ));

      return res.status(200).json(teamClassifications);
    }
    catch (err) {
      console.log(err)
      const errors = err.errors || [{ message: 'Fatal Error!'}];
      return res.status(400).json({ errors: errors.map(e => e.message) });
    }
  }

}

export default new HomePageController();

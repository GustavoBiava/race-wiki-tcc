import Race from "../../models/Race";
import Country from "../../models/Country";
import User from '../../models/Auth/User';
import TagsPublication from '../../models/Social/TagsPublication';
import Tag from '../../models/Social/Tag';
import CountryPicture from "../../models/Pictures/CountryPicture";
import RacePicture from "../../models/Pictures/RacePicture";
import Publication from "../../models/Social/Publication";
import PublicationPicture from "../../models/Pictures/PublicationPicture";

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class HomePageController {

  async getRaces(req, res) {
    try {
      const races = await Race.findAll({
        attributes: ['name', 'date', 'slug'],
        order: [['date', 'ASC']],
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

  async getDriverClassification(req, res) {
    try {

    }
    catch (err) {
      
    }
  }

}

export default new HomePageController();

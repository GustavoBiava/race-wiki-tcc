import Race from "../../models/Race";
import Country from "../../models/Country";
import CountryPicture from "../../models/Pictures/CountryPicture";
import RacePicture from "../../models/Pictures/RacePicture";

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
          console.log(race.race_picture.length, index)
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

}

export default new HomePageController();

import Sequelize, { Model } from "sequelize";

export default class Country extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /\d/,
            msg: 'Name can\'t use numbers!',
          }
        }
      },
      iso3: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 3],
            msg: 'Iso3 need to have 3 characters!',
          }
        }
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.hasOne(models.CountryPicture, { foreignKey: 'country_id', as: 'country_picture'});
  }

}

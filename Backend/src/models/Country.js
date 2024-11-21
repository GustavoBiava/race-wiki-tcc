import Sequelize, { Model } from "sequelize";

export default class Country extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        allowNull: false,
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
    this.hasMany(models.Driver, { foreignKey: 'nationality'});
    this.hasMany(models.Team, { foreignKey: 'nationality'});
    this.hasMany(models.Race, { foreignKey: 'race_place'});
  }

}

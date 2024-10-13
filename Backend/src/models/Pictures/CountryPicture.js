import Sequelize, { Model } from 'sequelize';

import appConfig from '../../config/appConfig';

export default class CountryPicture extends Model {
  static init(sequelize) {
    super.init({
      original_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "countrys",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        validate: {
          isInt: {
            msg: 'Country_id need to be integer!',
          }
        }
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.appURL}/images/${this.getDataValue('filename')}`
        }
      }

    }, { sequelize});
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Country, { foreignKey: 'country_id', as: 'country_picture'});
  }
}


import Sequelize, { Model } from 'sequelize';

import appConfig from '../../config/appConfig';

export default class RacePicture extends Model {
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
      race_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "races",
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
    this.belongsTo(models.Race, { foreignKey: 'race_id', as: 'race_picture'});
  }
}


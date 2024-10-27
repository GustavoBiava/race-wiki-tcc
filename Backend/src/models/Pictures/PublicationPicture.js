import Sequelize, { Model } from 'sequelize';

import appConfig from '../../config/appConfig';

export default class PublicationPicture extends Model {
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
      publication_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "publications",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        validate: {
          isInt: {
            msg: 'Publication_id need to be integer!',
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
    this.belongsTo(models.Publication, { foreignKey: 'publication_id', as: 'publication_picture'});
  }
}


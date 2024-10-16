import Sequelize, { Model } from 'sequelize';

import appConfig from '../../config/appConfig';

export default class TeamPicture extends Model {
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
      team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          model: "teams",
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
    this.belongsTo(models.Team, { foreignKey: 'team_id', as: 'team_picture'});
  }
}


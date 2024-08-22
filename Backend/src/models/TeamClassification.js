import Sequelize, { Model } from "sequelize";

export default class TeamClassification extends Model {
  static init(sequelize) {
    super.init({
      season_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'seasons',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Not a integer value!',
          }
        }
      },
      points: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Not a float value!',
          }
        }
      },
      chassis: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 10],
            msg: 'Invalid length (Min: 3, Max: 10)',
          }
        }
      },
    }, { sequelize });
    return this;
  }
}

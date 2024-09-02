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
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Season_id need to be a integer!',
          }
        }
      },
      team_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Team_id need to be a integer!',
          }
        }
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Position not a integer value!',
          }
        }
      },
      points: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Points not a float value!',
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

  static associate(models) {
    this.belongsTo(models.Team, { foreignKey: 'team_id' });
    this.belongsTo(models.Season, { foreignKey: 'season_id' });
  }

}

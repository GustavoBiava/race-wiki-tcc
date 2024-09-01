import Sequelize, { Model } from "sequelize";

export default class TeamRaceResult extends Model {
  static init(sequelize) {
    super.init({
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
      race_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'races',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        validate: {
          isInt: {
            msg: 'Race_id need to be a integer!',
          }
        }
      },
      laps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Laps not a integer value',
          }
        }
      },
      points: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Points not a double value',
          }
        }
      },
    }, { sequelize });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Race, { foreignKey: 'race_id' });
    this.belongsTo(models.Team, { foreignKey: 'team_id' });
  }

}
